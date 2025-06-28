import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

export function FormattedText({ text, className = "" }: FormattedTextProps) {
  if (!text) return null;

  const formatText = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    
    let inTable = false;
    let tableRows: string[] = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        if (inTable) {
          elements.push(renderTable(tableRows, index));
          tableRows = [];
          inTable = false;
        }
        elements.push(<br key={`br-${index}`} />);
        return;
      }
      
      // Проверяем табличную строку (содержит |)
      if (trimmedLine.includes('|') && trimmedLine.split('|').length >= 3) {
        if (!inTable) {
          inTable = true;
        }
        tableRows.push(trimmedLine);
        return;
      } else if (inTable) {
        elements.push(renderTable(tableRows, index));
        tableRows = [];
        inTable = false;
      }
      
      // Заголовки **текст**
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        const headerText = trimmedLine.slice(2, -2);
        elements.push(
          <h3 key={`header-${index}`} className="font-bold text-lg mb-3 mt-4 first:mt-0 text-blue-600">
            {headerText}
          </h3>
        );
        return;
      }
      
      // Элементы списка
      if (trimmedLine.startsWith('- ')) {
        const listItem = trimmedLine.slice(2);
        elements.push(
          <div key={`list-${index}`} className="flex items-start mb-1">
            <span className="text-blue-500 mr-2">•</span>
            <span>{processInlineFormatting(listItem)}</span>
          </div>
        );
        return;
      }
      
      // Обычные параграфы
      elements.push(
        <p key={`p-${index}`} className="mb-2 text-gray-700 leading-relaxed">
          {processInlineFormatting(trimmedLine)}
        </p>
      );
    });
    
    if (inTable && tableRows.length > 0) {
      elements.push(renderTable(tableRows, lines.length));
    }
    
    return elements;
  };

  const renderTable = (rows: string[], key: number) => {
    if (rows.length === 0) return null;
    
    return (
      <div key={`table-${key}`} className="my-4 overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full bg-white">
          <tbody>
            {rows.map((row, rowIndex) => {
              const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
              return (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  {cells.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex} 
                      className={`px-4 py-2 text-sm ${
                        cellIndex === 0 
                          ? 'font-medium text-gray-700 bg-gray-100 w-1/3' 
                          : 'text-gray-900'
                      }`}
                    >
                      {processInlineFormatting(cell)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const processInlineFormatting = (text: string): React.ReactNode => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    let processedText: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    
    const boldMatches: { start: number; end: number; text: string }[] = [];
    while ((match = boldRegex.exec(text)) !== null) {
      boldMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[1]
      });
    }
    
    boldMatches.sort((a, b) => a.start - b.start);
    
    let currentPos = 0;
    boldMatches.forEach((boldMatch, index) => {
      if (boldMatch.start > currentPos) {
        const beforeText = text.slice(currentPos, boldMatch.start);
        processedText.push(beforeText);
      }
      
      processedText.push(
        <strong key={`bold-${index}`} className="font-bold">
          {boldMatch.text}
        </strong>
      );
      
      currentPos = boldMatch.end;
    });
    
    if (currentPos < text.length) {
      processedText.push(text.slice(currentPos));
    }
    
    if (boldMatches.length === 0) {
      return text;
    }
    
    return processedText;
  };

  return (
    <div className={className}>
      {formatText(text)}
    </div>
  );
}