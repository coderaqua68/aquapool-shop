// Парсер HTML характеристик с сайтов
export interface ParsedSpecification {
  group: string;
  key: string;
  value: string;
}

export function parseHTMLSpecs(htmlContent: string): ParsedSpecification[] {
  const specs: ParsedSpecification[] = [];
  
  // Создаем временный DOM элемент для парсинга
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  let currentGroup = 'Основные';
  
  // Ищем группы характеристик
  const groupElements = tempDiv.querySelectorAll('.product-item-detail-properties-group-name, .properties-group-name, .spec-group-name');
  const propertyElements = tempDiv.querySelectorAll('.product-item-detail-properties-group-property, .property-item, .spec-item');
  
  // Если есть структурированные группы
  if (groupElements.length > 0) {
    groupElements.forEach((groupEl, groupIndex) => {
      const groupName = groupEl.textContent?.trim() || `Группа ${groupIndex + 1}`;
      currentGroup = groupName;
      
      // Найти свойства этой группы
      let nextElement = groupEl.parentElement?.nextElementSibling;
      while (nextElement && !nextElement.querySelector('.product-item-detail-properties-group-name')) {
        const propertyName = nextElement.querySelector('.product-item-detail-properties-group-property-name, .property-name, .spec-name')?.textContent?.trim();
        const propertyValue = nextElement.querySelector('.product-item-detail-properties-group-property-val, .property-value, .spec-value')?.textContent?.trim();
        
        if (propertyName && propertyValue) {
          specs.push({
            group: currentGroup,
            key: propertyName,
            value: propertyValue
          });
        }
        nextElement = nextElement.nextElementSibling;
      }
    });
  } else {
    // Простой парсинг без групп
    propertyElements.forEach(prop => {
      const nameEl = prop.querySelector('.product-item-detail-properties-group-property-name, .property-name, .spec-name');
      const valueEl = prop.querySelector('.product-item-detail-properties-group-property-val, .property-value, .spec-value');
      
      const name = nameEl?.textContent?.trim();
      const value = valueEl?.textContent?.trim();
      
      if (name && value) {
        specs.push({
          group: currentGroup,
          key: name,
          value: value
        });
      }
    });
  }
  
  // Если ничего не найдено структурированного, пробуем простой текстовый парсинг
  if (specs.length === 0) {
    const text = tempDiv.textContent || htmlContent;
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    for (const line of lines) {
      if (line.includes(':') && !line.includes('http')) {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
        if (key.trim() && value) {
          specs.push({
            group: 'Характеристики',
            key: key.trim(),
            value: value
          });
        }
      }
    }
  }
  
  return specs;
}

export function convertSpecsToKeyValue(specs: ParsedSpecification[]): Array<{key: string, value: string}> {
  return specs.map(spec => ({
    key: spec.key,
    value: spec.value
  }));
}

export function formatSpecsAsTable(specs: ParsedSpecification[]): string {
  if (specs.length === 0) return '';
  
  let result = '';
  let currentGroup = '';
  
  specs.forEach(spec => {
    if (spec.group !== currentGroup) {
      currentGroup = spec.group;
      result += `\n**${currentGroup}**\n\n`;
    }
    result += `| ${spec.key} | ${spec.value} |\n`;
  });
  
  return result;
}