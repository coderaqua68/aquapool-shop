import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

export function FormattedText({ text, className = "" }: FormattedTextProps) {
  if (!text) return null;

  // Разбиваем текст на абзацы
  const paragraphs = text.split('\n').filter(paragraph => paragraph.trim() !== '');

  const formatLine = (line: string) => {
    // Заменяем **текст** на жирный
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Заменяем *текст* на курсив
    line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Заменяем - список на • список
    line = line.replace(/^-\s+/gm, '• ');
    
    // Заменяем 1. 2. 3. на красивые номера
    line = line.replace(/^(\d+)\.\s+/gm, '<span class="font-medium text-blue-600">$1.</span> ');
    
    return line;
  };

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => {
        const formattedParagraph = formatLine(paragraph);
        
        // Проверяем, является ли это списком
        const isList = paragraph.includes('•') || /^\d+\./.test(paragraph);
        
        if (isList) {
          const listItems = paragraph.split(/(?=•|(?=\d+\.))/g).filter(item => item.trim());
          return (
            <ul key={index} className="space-y-1 mb-4 last:mb-0">
              {listItems.map((item, itemIndex) => (
                <li 
                  key={itemIndex} 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatLine(item.trim()) }}
                />
              ))}
            </ul>
          );
        }
        
        return (
          <p 
            key={index} 
            className="text-gray-700 leading-relaxed mb-4 last:mb-0"
            dangerouslySetInnerHTML={{ __html: formattedParagraph }}
          />
        );
      })}
    </div>
  );
}