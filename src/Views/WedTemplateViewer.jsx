import React, { useEffect, useState } from 'react';

function WedTemplateViewer() {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Load the HTML content from your source, e.g., an API request or a file.
    fetch('./assets/WedTemplate/template-1.html')
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error('Error loading HTML content:', error));
  }, []);

  return (
    <div>
      {/* Render the HTML content using dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}

export default WedTemplateViewer;
