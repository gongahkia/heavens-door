const editor = document.getElementById('editor');
const highlight = document.getElementById('highlight');

function updateHighlight() {
    const text = editor.value;
    const highlightedText = text.replace(/^\s*(\([A-Z]\))|(\d{4}-\d{2}-\d{2})|(\+\w+)|(@\w+)|([^+\s@]+)/gm,
        (match, p1, p2, p3, p4, p5) => {
            if (p1) return `<span class="priority">${p1}</span>`; 
            if (p2) return `<span class="date">${p2}</span>`; 
            if (p3) return `<span class="project">${p3}</span>`; 
            if (p4) return `<span class="context">${p4}</span>`; 
            if (p5) return `<span class="description">${p5}</span>`; 
            return match; 
        }
    );
    highlight.innerHTML = highlightedText; 
}

function changeColorScheme() {
    const scheme = document.getElementById('color-scheme').value;
    document.body.classList.remove('gruvbox', 'everforest', 'ayu', 'mononoki', 'rose-pine', 'catpuccin', 'tokyo-night');
    document.body.classList.add(scheme);
}


window.addEventListener('beforeunload', () => {
    navigator.clipboard.writeText(editor.value)
        .then(() => console.log('Text copied to clipboard!'))
        .catch(err => console.error('Failed to copy text:', err));
});
