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

    // ===== 6. SKILL CRUD LOGIC =====
    const skillIcons = [
        'fa-server', 'fa-brain', 'fa-laptop-code', 'fa-palette', 
        'fa-tools', 'fa-bolt', 'fa-rocket', 'fa-database', 'fa-code', 'fa-mobile-alt', 'fa-cloud'
    ];
    let currentIconIdx = 0;

    // Fetch Skills from DB
    window.fetchSkills = async function() {
        try {
            const response = await fetch('/api/skills');
            if (!response.ok) throw new Error('Network response was not ok');
            const skills = await response.json();
            renderSkills(skills);
        } catch (error) {
            console.error('Error fetching skills:', error);
            const container = document.getElementById('skillsGridContainer');
            if (container) {
                container.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; color: #ff5f56; padding: 50px 0;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 15px;"></i>
                        <p>Failed to load Database. Make sure Docker is running.</p>
                    </div>`;
            }
        }
    };

    function renderSkills(skills) {
        const container = document.getElementById('skillsGridContainer');
        if (!container) return;
        
        container.innerHTML = '';
        if (skills.length === 0) {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 50px;">Chưa có kỹ năng nào. Bấm [+] để thêm mới!</div>';
            return;
        }

        skills.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card';
            card.style.position = 'relative';
            
            const escTitle = skill.title.replace(/'/g, "\\'");
            const escContent = skill.content.replace(/'/g, "\\'");
            const escIcon = skill.icon.replace(/'/g, "\\'");
            
            card.innerHTML = `
                <div class="crud-actions" style="position: absolute; top: 10px; right: 10px; display: flex; gap: 5px; opacity: 0; transition: opacity 0.2s;">
                    <button class="crud-btn btn-edit" title="Sửa" onclick="openEditSkillModal(${skill.id}, '${escTitle}', '${escContent}', '${escIcon}')" style="background: transparent; border: none; color: var(--accent-yellow); cursor: pointer; padding: 4px;"><i class="fas fa-edit"></i></button>
                    <button class="crud-btn btn-delete" title="Xóa" onclick="openDeleteSkillModal(${skill.id}, '${escTitle}', 'skill')" style="background: transparent; border: none; color: #ff5f56; cursor: pointer; padding: 4px;"><i class="fas fa-trash-alt"></i></button>
                </div>
                <div class="skill-icon"><i class="fas ${skill.icon}"></i></div>
                <div>
                    <strong>${skill.title}</strong>
                    <p>${skill.content}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Call on load
    if (document.getElementById('skillsGridContainer')) {
        fetchSkills();
    }

    // MODAL STATE CONTROLS
    window.openSkillModal = function() {
        document.getElementById('skillModalTitle').innerText = 'Add New Skill';
        document.getElementById('skillInputId').value = '';
        document.getElementById('skillInputTitle').value = '';
        document.getElementById('skillInputContent').value = '';
        currentIconIdx = Math.max(0, skillIcons.indexOf('fa-server'));
        updateSkillIconDisplay();
        showModal('skillModal');
    };

    window.openEditSkillModal = function(id, title, content, icon) {
        document.getElementById('skillModalTitle').innerText = 'Edit Skill';
        document.getElementById('skillInputId').value = id;
        document.getElementById('skillInputTitle').value = title;
        document.getElementById('skillInputContent').value = content;
        
        let idx = skillIcons.indexOf(icon);
        if (idx === -1) {
            skillIcons.push(icon);
            idx = skillIcons.length - 1;
        }
        currentIconIdx = idx;
        updateSkillIconDisplay();
        showModal('skillModal');
    };

    window.closeSkillModal = function() { hideModal('skillModal'); };

    window.nextSkillIcon = function() {
        currentIconIdx = (currentIconIdx + 1) % skillIcons.length;
        updateSkillIconDisplay();
    };

    window.prevSkillIcon = function() {
        currentIconIdx = (currentIconIdx - 1 + skillIcons.length) % skillIcons.length;
        updateSkillIconDisplay();
    };

    function updateSkillIconDisplay() {
        const iconClass = skillIcons[currentIconIdx];
        document.getElementById('skillCurrentIcon').className = 'fas ' + iconClass;
        document.getElementById('skillIconName').innerText = iconClass;
        document.getElementById('skillInputValue').value = iconClass;
    }

    window.saveSkill = async function() {
        const id = document.getElementById('skillInputId').value;
        const title = document.getElementById('skillInputTitle').value.trim();
        const content = document.getElementById('skillInputContent').value.trim();
        const icon = document.getElementById('skillInputValue').value;
        
        if (!title || !content) {
            alert('Vui lòng nhập đầy đủ Title và Content!');
            return;
        }
        
        const skillData = { title, content, icon };
        if (id) skillData.id = id;

        try {
            const btn = document.querySelector('#skillModal .btn-save');
            const oldText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Saving...';
            btn.disabled = true;

            const response = await fetch('/api/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skillData)
            });

            btn.innerHTML = oldText;
            btn.disabled = false;

            if (!response.ok) throw new Error('Save failed');
            
            closeSkillModal();
            fetchSkills(); // Reload grid
        } catch (error) {
            alert('Lỗi: Không thể lưu dữ liệu vào CSDL!');
            console.error(error);
        }
    };

    // DELETE MODAL LOGIC
    window.openDeleteSkillModal = function(id, name, type) {
        document.getElementById('deleteTargetId').value = id;
        document.getElementById('deleteTargetName').innerText = name;
        document.getElementById('deleteTargetType').value = type;
        showModal('deleteModal');
    };

    window.closeDeleteModal = function() { hideModal('deleteModal'); };

    window.executeDelete = async function() {
        const id = document.getElementById('deleteTargetId').value;
        const type = document.getElementById('deleteTargetType').value;
        
        try {
            const btn = document.querySelector('#deleteModal .btn-save');
            const oldText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Deleting...';
            btn.disabled = true;
            
            let url = '';
            if (type === 'skill') url = `/api/skills/${id}`;
            // add project url later if needed
            
            const response = await fetch(url, { method: 'DELETE' });
            
            btn.innerHTML = oldText;
            btn.disabled = false;
            
            if (!response.ok) throw new Error('Delete failed');
            
            closeDeleteModal();
            if (type === 'skill') window.fetchSkills(); // refresh UI
        } catch (error) {
            alert('Lỗi: Không thể xóa mục này!');
            console.error(error);
        }
    };

    // Helper functions
    function showModal(id) {
        const modal = document.getElementById(id);
        if(!modal) return;
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }
    
    function hideModal(id) {
        const modal = document.getElementById(id);
        if(!modal) return;
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }

});
