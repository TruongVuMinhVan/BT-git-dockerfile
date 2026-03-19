document.addEventListener('DOMContentLoaded', function () {

    // ===== 1. ROLE TYPEWRITER – cycles "Full Stack Developer", "Frontend Developer", "Backend Developer" =====
    const roles = ['Full Stack Developer', 'Frontend Developer', 'Backend Developer'];
    const roleEl = document.getElementById('roleText');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeRole() {
        if (!roleEl) return;
        const current = roles[roleIndex];

        if (!isDeleting) {
            roleEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                setTimeout(() => { isDeleting = true; typeRole(); }, 2000);
                return;
            }
            setTimeout(typeRole, 80);
        } else {
            roleEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, 400);
                return;
            }
            setTimeout(typeRole, 40);
        }
    }
    typeRole();

    // ===== 2. TERMINAL CODE TYPEWRITER =====
    const terminalBody = document.getElementById('terminalBody');
    let typeTimeout;
    
    const terminalData = [
        [
            { num: 1, html: '<span class="t-keyword">const</span> <span class="t-variable">user</span> = <span class="t-bracket">{</span>' },
            { num: 2, html: '  name: <span class="t-string">\'Truong Vu Minh Van\'</span>,' },
            { num: 3, html: '  hobbies: [<span class="t-string">\'Listening to music\'</span>, <span class="t-string">\'Eager to learn\'</span>],' },
            { num: 4, html: '  goals: [' },
            { num: 5, html: '    <span class="t-string">\'<span class="t-emoji">🚀</span> Become a professional Fullstack developer\'</span>,' },
            { num: 6, html: '    <span class="t-string">\'<span class="t-emoji">💡</span> Build high-quality software solutions\'</span>' },
            { num: 7, html: '  ],' },
            { num: 8, html: '  currentProject: <span class="t-string">\'<span class="t-emoji">🏥</span> AI Health System\'</span>,' },
            { num: 9, html: '  aiAccuracy: <span class="t-number">94.1</span>' },
            { num: 10, html: '<span class="t-bracket">}</span>;' }
        ],
        [
            { num: 1, html: '<span class="t-keyword">function</span> <span class="t-function">createAwesomePortfolio</span><span class="t-bracket">(</span><span class="t-variable">name</span>: <span class="t-type">string</span><span class="t-bracket">)</span>: <span class="t-type">Portfolio</span> <span class="t-bracket">{</span>' },
            { num: 2, html: '  <span class="t-keyword">return</span> <span class="t-bracket">{</span>' },
            { num: 3, html: '    Developer: <span class="t-string">\'Truong Vu Minh Van\'</span>,' },
            { num: 4, html: '    techStack: [<span class="t-string">\'Next.js\'</span>, <span class="t-string">\'React\'</span>, <span class="t-string">\'Flutter\'</span>, <span class="t-string">\'FastAPI\'</span>, <span class="t-string">\'MySQL\'</span>],' },
            { num: 5, html: '    aim: <span class="t-string">\'<span class="t-emoji">🚀</span> Software Architect\'</span>,' },
            { num: 6, html: '    openToWork: <span class="t-number">true</span>,' },
            { num: 7, html: '  <span class="t-bracket">}</span>;' },
            { num: 8, html: '<span class="t-bracket">}</span>' }
        ],
        [
            { num: 1, html: '<span class="t-bracket">[</span><span class="t-type">HttpGet</span>(<span class="t-string">"hello"</span>)<span class="t-bracket">]</span>' },
            { num: 2, html: '<span class="t-keyword">public</span> <span class="t-type">IActionResult</span> <span class="t-function">GetHello</span>()' },
            { num: 3, html: '<span class="t-bracket">{</span>' },
            { num: 4, html: '    <span class="t-keyword">return</span> <span class="t-function">Ok</span>(<span class="t-keyword">new</span>' },
            { num: 5, html: '    <span class="t-bracket">{</span>' },
            { num: 6, html: '        message = <span class="t-string">"Hello! Welcome."</span>,' },
            { num: 7, html: '        about = <span class="t-string">"I am Truong Vu Minh Van, a software developer."</span>,' },
            { num: 8, html: '        info = <span class="t-string">"This website is my portfolio."</span>' },
            { num: 9, html: '    <span class="t-bracket">}</span>);' },
            { num: 10, html: '<span class="t-bracket">}</span>' }
        ]
    ];

    let currentLangIndex = 0;

    function playTerminalAnimation() {
        if (!terminalBody) return;
        
        terminalBody.innerHTML = '';
        const lines = terminalData[currentLangIndex];
        let lineIdx = 0;
        
        function addLine() {
            if (lineIdx >= lines.length) {
                // Done typing this block. Wait, then move to next block
                currentLangIndex = (currentLangIndex + 1) % terminalData.length;
                typeTimeout = setTimeout(playTerminalAnimation, 4000); // 4 seconds delay before switching
                return;
            }
            const line = lines[lineIdx];
            const div = document.createElement('div');
            div.className = 'terminal-line';
            div.innerHTML = `<span class="ln">${line.num}</span><span class="code">${line.html}</span>`;
            terminalBody.appendChild(div);
            lineIdx++;
            typeTimeout = setTimeout(addLine, 150);
        }
        
        // Start typing after a short delay
        typeTimeout = setTimeout(addLine, 500);
    }

    if (terminalBody) {
        playTerminalAnimation();
    }

    // ===== 3. SCROLL FADE-IN (Kept for inner pane animation) =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ===== 4. IDE TAB MANAGEMENT =====
    window.openIdeTab = function(targetId) {
        // 1. Hide all editor panes
        document.querySelectorAll('.editor-pane').forEach(pane => {
            pane.style.display = 'none';
            pane.classList.remove('active');
        });

        // 2. Show the target pane
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
            targetPane.style.display = 'block';
            targetPane.classList.add('active');
        }

        // 3. Update sidebar active state
        document.querySelectorAll('.file-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Find matching sidebar item based on click or nav
        const sidebarItems = Array.from(document.querySelectorAll('.file-item'));
        const activeItem = sidebarItems.find(item => item.getAttribute('onclick')?.includes(targetId));
        if (activeItem) activeItem.classList.add('active');

        // 4. Update Top Nav active state
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('onclick')?.includes(targetId)) {
                link.classList.add('active');
            }
        });

        // 5. Handle Tabs Bar
        const tabsBar = document.getElementById('ideTabsBar');
        let existingTab = document.querySelector(`.ide-tab[data-target="${targetId}"]`);
        
        // Deactivate all
        document.querySelectorAll('.ide-tab').forEach(t => t.classList.remove('active'));

        if (existingTab) {
            existingTab.classList.add('active');
        } else {
            // Create new tab
            const newTab = document.createElement('div');
            newTab.className = 'ide-tab active';
            newTab.setAttribute('data-target', targetId);
            
            // Get label and icon from sidebar active item
            let iconHtml = '<i class="fas fa-file-code"></i>';
            let fileName = targetId + '.txt';
            
            if (activeItem) {
                const icon = activeItem.querySelector('i');
                if (icon) iconHtml = icon.outerHTML;
                fileName = activeItem.querySelector('span').innerText;
            } else if (targetId === 'hero') {
                iconHtml = '<i class="fab fa-markdown file-icon md"></i>';
                fileName = 'README.md';
            }

            newTab.innerHTML = `${iconHtml} ${fileName} <i class="fas fa-times close-tab" onclick="closeIdeTab(event, '${targetId}')"></i>`;
            newTab.onclick = (e) => {
                if(!e.target.classList.contains('close-tab')) {
                    openIdeTab(targetId);
                }
            };
            tabsBar.appendChild(newTab);
        }
        
        // Mobile close nav
        document.getElementById('navLinks').classList.remove('open');
    };

    window.closeIdeTab = function(event, targetId) {
        event.stopPropagation();
        const tab = document.querySelector(`.ide-tab[data-target="${targetId}"]`);
        if (!tab) return;
        
        const wasActive = tab.classList.contains('active');
        tab.remove();
        
        if (wasActive) {
            // Find another tab to switch to or show empty
            const remainingTabs = document.querySelectorAll('.ide-tab');
            if (remainingTabs.length > 0) {
                const nextTarget = remainingTabs[remainingTabs.length - 1].getAttribute('data-target');
                openIdeTab(nextTarget);
            } else {
                document.querySelectorAll('.editor-pane').forEach(p => p.style.display = 'none');
                document.querySelectorAll('.file-item, .nav-links a').forEach(item => item.classList.remove('active'));
            }
        }
    };
});
