const editor = document.getElementById('editor');
const highlight = document.getElementById('highlight');

// Function to update highlighting
function updateHighlight() {
    const text = editor.value;

    // Highlighting regex with specific classes
    const highlightedText = text
        .replace(/^\s*(x)?\s*(\([A-Z]\))?\s*(\d{4}-\d{2}-\d{2})?\s*(\d{4}-\d{2}-\d{2})?\s*(.*?)(\s*\+\w+)?(\s*\@\w+)?(\s*[\w]+:[\w\-]+)/gm, '<span class="todo">$&</span>') // Highlight TODO items
        .replace(/(\+\w+)/g, '<span class="project">$1</span>') // Highlight projects
        .replace(/(@\w+)/g, '<span class="context">$1</span>') // Highlight contexts
        .replace(/([\w]+:[\w\-]+)/g, '<span class="key-value">$&</span>') // Highlight key-value pairs
        .replace(/(\([A-Z]\))/g, '<span class="priority">$1</span>'); // Highlight priority indicators

    highlight.innerHTML = highlightedText; // Set the highlighted content
}

// Function to change color scheme
function changeColorScheme() {
    const scheme = document.getElementById('color-scheme').value;

    // Remove existing classes
    editor.classList.remove('default', 'dark', 'light');
    
    // Add selected scheme class
    editor.classList.add(scheme);
}

// Clipboard functionality on window close
window.addEventListener('beforeunload', () => {
    navigator.clipboard.writeText(editor.value)
        .then(() => console.log('Text copied to clipboard!'))
        .catch(err => console.error('Failed to copy text:', err));
});

