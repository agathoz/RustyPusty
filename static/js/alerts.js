// Script to parse GitHub-style blockquotes and convert them to styled alerts
document.addEventListener("DOMContentLoaded", function() {
    const blockquotes = document.querySelectorAll(".post-content blockquote");
    
    blockquotes.forEach(bq => {
        const firstP = bq.querySelector("p");
        if (!firstP) return;

        const html = firstP.innerHTML;
        // Regex to match > [!TYPE]
        // Note: HTML might have escaped chars or simple text depending on parser
        
        const match = html.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);
        
        if (match) {
            const type = match[1].toLowerCase();
            // Remove the [!TYPE] marker and any following newline/break
            let cleanContent = html.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](\s*<br>)?\s*/, "");
            
            // Create wrapper
            const div = document.createElement("div");
            div.className = `alert alert-${type}`;
            
            // Improved title
            const title = type.charAt(0).toUpperCase() + type.slice(1);
            
            div.innerHTML = `<span class="alert-title">${title}</span><p>${cleanContent}</p>`;
            
            // Add remaining paragraphs if any
            const siblings = Array.from(bq.children).slice(1);
            siblings.forEach(sib => {
                div.appendChild(sib.cloneNode(true));
            });
            
            bq.parentNode.replaceChild(div, bq);
        }
    });
});
