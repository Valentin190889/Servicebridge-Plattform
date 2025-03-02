import React from 'react';
import { Brain, Code, BarChart, Users, Lightbulb, Network } from 'lucide-react';
import '../../styles/hexagon.css';

interface ExpertCategory {
  icon: React.ElementType;
  label: string;
  column: number;
  index: number;
}

const categories: ExpertCategory[] = [
  { icon: Brain, label: 'AI Strategy', column: 1, index: 1 },
  { icon: Code, label: 'Development', column: 1, index: 2 },
  { icon: BarChart, label: 'Analytics', column: 2, index: 1 },
  { icon: Users, label: 'Management', column: 2, index: 2 },
  { icon: Lightbulb, label: 'Innovation', column: 3, index: 1 },
  { icon: Network, label: 'Architecture', column: 3, index: 2 },
];

export function ExpertGrid() {
  const handleCategoryClick = (label: string) => {
    // Handle category selection
    console.log(`Selected category: ${label}`);
  };

  const groupedCategories = categories.reduce((acc, category) => {
    const column = acc.get(category.column) || [];
    column.push(category);
    acc.set(category.column, column);
    return acc;
  }, new Map<number, ExpertCategory[]>());

  return (
    <div className="hexagon-container">
      {Array.from(groupedCategories).map(([columnIndex, columnCategories]) => (
        <div key={columnIndex} className="hexagon-column">
          {columnCategories.map((category) => (
            <div
              key={category.label}
              className="hexagon"
              style={{
                '--column': category.column,
                '--index': category.index,
              } as React.CSSProperties}
              onClick={() => handleCategoryClick(category.label)}
            >
              <div className="hexagon-content">
                <category.icon className="hexagon-icon" />
                <span className="hexagon-label">{category.label}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}