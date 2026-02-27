/**
 * MedKitt Landing Page - Config-Driven Components
 * Reads from config/landing-page.json
 */

(async function() {
    let CONFIG = null;
    
    // Try to load config file
    try {
        const response = await fetch('config/landing-page.json');
        if (response.ok) {
            CONFIG = await response.json();
        }
    } catch (e) {
        console.warn('Could not load config, using defaults');
    }
    
    // =====================
    // DEMO WIDGET
    // =====================
    function renderDemo() {
        const container = document.getElementById('live-consult-demo');
        if (!container) return;
        
        const demoConfig = CONFIG?.demoWidget || {};
        const scenarios = demoConfig.scenarios || [];
        
        if (!demoConfig.enabled || scenarios.length === 0) {
            container.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,0.5)">Demo coming soon</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="medkitt-demo-widget">
                <div class="demo-header">
                    <div class="demo-logo">
                        <svg class="logo-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#00d4aa"/>
                            <path d="M2 17L12 22L22 17" stroke="#00d4aa" stroke-width="2"/>
                            <path d="M2 12L12 17L22 12" stroke="#00d4aa" stroke-width="2"/>
                        </svg>
                        <span class="demo-logo-text">MedKitt</span>
                    </div>
                    <div class="demo-badge">LIVE DEMO</div>
                </div>
                
                <div class="scenario-selector">
                    <label class="selector-label">Select a Clinical Case:</label>
                    <select class="scenario-dropdown" id="scenario-select">
                        <option value="">Choose a scenario...</option>
                        ${scenarios.map(s => `<option value="${s.id}">${s.title}</option>`).join('')}
                    </select>
                </div>

                <div class="patient-card" id="patient-card" style="display: none;">
                    <div class="patient-header">
                        <span class="patient-tag">PATIENT</span>
                        <span class="patient-demographics" id="patient-demo"></span>
                    </div>
                    <div class="vitals-grid" id="vitals-grid"></div>
                    <div class="history-section" id="history-section"></div>
                </div>

                <div class="chat-container" id="chat-container">
                    <div class="welcome-message">
                        <div class="welcome-icon">👋</div>
                        <h3>Try MedKitt AI Consult</h3>
                        <p>${demoConfig.subtitle || 'Select a clinical scenario above and ask questions just like you would in a real consult. No signup required.'}</p>
                    </div>
                </div>

                <div class="input-container">
                    <input type="text" class="consult-input" id="consult-input" placeholder="Type your clinical question..." disabled />
                    <button class="send-btn" id="send-btn" disabled>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                    </button>
                </div>

                <div class="demo-footer">
                    <span class="powered-by">Powered by MedKitt AI</span>
                    <span class="demo-disclaimer">Demo only - Not for clinical use</span>
                </div>
            </div>
        `;

        attachDemoListeners(scenarios);
    }

    function attachDemoListeners(scenarios) {
        const scenarioSelect = document.getElementById('scenario-select');
        const consultInput = document.getElementById('consult-input');
        const sendBtn = document.getElementById('send-btn');

        scenarioSelect?.addEventListener('change', (e) => loadScenario(e.target.value, scenarios));
        sendBtn?.addEventListener('click', () => sendMessage(scenarios));
        consultInput?.addEventListener('keypress', (e) => { 
            if (e.key === 'Enter') sendMessage(scenarios); 
        });
    }

    function loadScenario(scenarioId, scenarios) {
        const scenario = scenarios.find(s => s.id === scenarioId);
        const patientCard = document.getElementById('patient-card');
        const consultInput = document.getElementById('consult-input');
        const sendBtn = document.getElementById('send-btn');
        const chatContainer = document.getElementById('chat-container');

        if (!scenario) {
            patientCard.style.display = 'none';
            consultInput.disabled = true;
            sendBtn.disabled = true;
            return;
        }

        const p = scenario.patientInfo;
        document.getElementById('patient-demo').textContent = `${p.age}yo ${p.sex} • ${p.chiefComplaint}`;
        
        const v = p.vitals;
        document.getElementById('vitals-grid').innerHTML = `
            <div class="vital-item"><span class="vital-label">BP</span><span class="vital-value">${v.bp}</span></div>
            <div class="vital-item"><span class="vital-label">HR</span><span class="vital-value">${v.hr}</span></div>
            <div class="vital-item"><span class="vital-label">RR</span><span class="vital-value">${v.rr}</span></div>
            <div class="vital-item"><span class="vital-label">SpO₂</span><span class="vital-value">${v.spo2}%</span></div>
            <div class="vital-item"><span class="vital-label">Temp</span><span class="vital-value">${v.temp}°C</span></div>
        `;

        document.getElementById('history-section').innerHTML = `
            <div class="history-title">History</div>
            <ul class="history-list">${p.history.map(h => `<li>${h}</li>`).join('')}</ul>
        `;

        patientCard.style.display = 'block';
        consultInput.disabled = false;
        sendBtn.disabled = false;
        consultInput.focus();

        chatContainer.innerHTML = `
            <div class="chat-message ai-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>${scenario.openingMessage}</p>
                    <p class="message-prompt">What would you like to know? Try: ${scenario.sampleQueries?.join(', ') || 'differential, workup, or treatment'}</p>
                </div>
            </div>
        `;
    }

    function sendMessage(scenarios) {
        const input = document.getElementById('consult-input');
        const message = input.value.trim();
        if (!message) return;

        const chatContainer = document.getElementById('chat-container');
        const scenarioId = document.getElementById('scenario-select').value;
        const scenario = scenarios.find(s => s.id === scenarioId);
        
        // Add user message
        chatContainer.innerHTML += `
            <div class="chat-message user-message">
                <div class="message-content">${escapeHtml(message)}</div>
            </div>
        `;
        input.value = '';

        // Show typing indicator
        chatContainer.innerHTML += `
            <div class="chat-message ai-message typing" id="typing-indicator">
                <div class="message-avatar">🤖</div>
                <div class="message-content"><span class="typing-dots"><span></span><span></span><span></span></span></div>
            </div>
        `;
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Generate response after delay
        setTimeout(() => {
            document.getElementById('typing-indicator')?.remove();
            const response = generateResponse(message, scenario);
            chatContainer.innerHTML += `
                <div class="chat-message ai-message">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">${formatMarkdown(response.content)}${renderSources(response.sources)}</div>
                </div>
            `;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 1200);
    }

    function generateResponse(query, scenario) {
        if (!scenario?.responses) {
            return { content: 'I\'m not sure about that. Try asking about the differential diagnosis, workup, or treatment.', sources: [] };
        }
        
        const lowerQuery = query.toLowerCase();
        const responses = scenario.responses;
        
        // Check each response key for matches
        for (const [key, response] of Object.entries(responses)) {
            if (key === 'default') continue;
            const keywords = key.split('|');
            if (keywords.some(kw => lowerQuery.includes(kw.toLowerCase()))) {
                return response;
            }
        }

        return responses.default || { content: 'I\'m not sure about that. Try asking about the differential diagnosis, workup, or treatment.', sources: [] };
    }

    function renderSources(sources) {
        if (!sources || sources.length === 0) return '';
        return `<div class="response-sources">Sources: ${sources.join(', ')}</div>`;
    }

    function formatMarkdown(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/\|(.+?)\|/g, (match, content) => {
                // Simple table formatting
                if (content.includes('---')) return '';
                const cells = content.split('|').map(c => `<td>${c.trim()}</td>`).join('');
                return `<tr>${cells}</tr>`;
            });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // =====================
    // VERIFICATION BADGE
    // =====================
    function renderBadge() {
        const container = document.getElementById('verification-badge');
        if (!container) return;

        const creds = CONFIG?.credentials || {};
        const team = [{
            name: creds.name || 'Dr. Andy Kitlowski',
            credentials: creds.credentials || ['MD', 'FACEP'],
            title: creds.title || 'Emergency Medicine Physician',
            role: creds.role || 'Co-Founder & Clinical Lead',
            bio: creds.bio || '',
            certifications: creds.certifications || []
        }];
        
        const affiliations = creds.affiliations || [
            { name: 'Dell Seton Medical Center', location: 'Austin, TX', type: 'Level 1 Trauma Center' },
            { name: 'UT Austin Dell Medical School', location: 'Austin, TX', type: 'Academic Affiliation' }
        ];
        
        const badges = CONFIG?.trustBadges || [
            { icon: '✓', title: 'Clinical Decision Support', description: 'Evidence-based algorithms' },
            { icon: '✎', title: 'Peer-Reviewed Content', description: 'Reviewed by board-certified physicians' },
            { icon: '🔒', title: 'Privacy-First', description: 'No patient data stored' },
            { icon: '⚕', title: 'Built by Physicians', description: 'Designed by clinicians' }
        ];

        // Add Schema.org markup
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'MedicalWebPage',
                    'name': CONFIG?.seo?.title || 'MedKitt - Clinical Decision Support',
                    'description': CONFIG?.seo?.description || 'Evidence-based clinical decision support',
                    'lastReviewed': new Date().toISOString().split('T')[0],
                    'reviewedBy': {
                        '@type': 'Physician',
                        'name': creds.name,
                        'medicalSpecialty': 'Emergency Medicine'
                    }
                },
                {
                    '@type': 'Physician',
                    'name': creds.name,
                    'jobTitle': creds.title,
                    'worksFor': {
                        '@type': 'Hospital',
                        'name': affiliations[0]?.name || 'Dell Seton Medical Center'
                    },
                    'credential': creds.credentials || ['MD']
                }
            ]
        }, null, 2);
        document.head.appendChild(schemaScript);

        // Get certifications for display
        const certList = creds.certifications || [];
        const certDisplay = certList.slice(0, 4).map(c => ({
            abbr: c.abbreviation,
            name: c.year ? `${c.name} (${c.year})` : c.name
        }));

        container.innerHTML = `
            <div class="medkitt-verification-badge">
                <div class="verification-hero">
                    <div class="hero-badge">
                        <svg class="shield-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#00d4aa" stroke-width="2"/>
                            <path d="M9 12l2 2 4-4" stroke="#00d4aa" stroke-width="2"/>
                        </svg>
                    </div>
                    <h2 class="section-title">Built by <span class="accent">Emergency Physicians</span></h2>
                    <p class="section-subtitle">Clinical expertise you can trust, backed by board-certified EM physicians</p>
                </div>

                <div class="trust-badges-grid">
                    ${badges.map(badge => `
                        <div class="trust-badge-item">
                            <div class="badge-icon">${badge.icon}</div>
                            <div class="badge-content">
                                <h4>${badge.title}</h4>
                                <p>${badge.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="clinical-team-preview">
                    <div class="team-card" id="team-card-trigger">
                        <div class="team-photo-placeholder">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">${team[0].name}, <span class="creds">${team[0].credentials.join(', ')}</span></h3>
                            <p class="team-title">${team[0].title}</p>
                            <div class="team-affiliations">
                                ${affiliations.map(h => `<span class="affiliation-tag">${h.name}</span>`).join('')}
                            </div>
                            <button class="meet-team-btn" id="meet-team-btn">
                                Meet the Clinical Team
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="certifications-strip">
                    ${certDisplay.map((c, i) => `
                        <div class="cert-item"><span class="cert-abbr">${c.abbr}</span><span class="cert-name">${c.name.split(' ')[0]}</span></div>
                        ${i < certDisplay.length - 1 ? '<div class="cert-divider"></div>' : ''}
                    `).join('')}
                </div>
            </div>

            <div class="team-modal-overlay" id="team-modal-overlay" style="display: none;">
                <div class="team-modal">
                    <button class="modal-close" id="modal-close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                    <div class="modal-content">
                        <div class="modal-team-member">
                            <div class="modal-photo-section">
                                <div class="modal-photo-placeholder">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                </div>
                                <div class="modal-credentials-badges">
                                    ${team[0].credentials.map(cred => `<span class="cred-badge">${cred}</span>`).join('')}
                                </div>
                            </div>
                            <div class="modal-info-section">
                                <h2 class="modal-name">${team[0].name}</h2>
                                <p class="modal-role">${team[0].role}</p>
                                <div class="modal-divider"></div>
                                <p class="modal-bio">${team[0].bio}</p>
                                
                                <div class="modal-affiliations">
                                    <h4>Hospital Affiliations</h4>
                                    ${affiliations.map(h => `
                                        <div class="affiliation-item">
                                            <span class="affiliation-name">${h.name}</span>
                                            <span class="affiliation-type">${h.type}</span>
                                            <span class="affiliation-location">${h.location}</span>
                                        </div>
                                    `).join('')}
                                </div>

                                <div class="modal-certifications">
                                    <h4>Board Certifications</h4>
                                    <ul class="certifications-list">
                                        ${creds.certifications?.map(cert => `
                                            <li class="certification-item">
                                                <span class="cert-abbr-small">${cert.abbreviation}</span>
                                                <span class="cert-full-name">${cert.name}</span>
                                                ${cert.year ? `<span class="cert-year">${cert.year}</span>` : ''}
                                            </li>
                                        `).join('') || ''}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        attachModalListeners();
    }

    function attachModalListeners() {
        const meetTeamBtn = document.getElementById('meet-team-btn');
        const teamCardTrigger = document.getElementById('team-card-trigger');
        const modalClose = document.getElementById('modal-close');
        const modalOverlay = document.getElementById('team-modal-overlay');

        meetTeamBtn?.addEventListener('click', (e) => { e.stopPropagation(); openModal(); });
        teamCardTrigger?.addEventListener('click', openModal);
        modalClose?.addEventListener('click', closeModal);
        modalOverlay?.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    }

    function openModal() {
        const modal = document.getElementById('team-modal-overlay');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        const modal = document.getElementById('team-modal-overlay');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // =====================
    // INITIALIZE
    // =====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            renderDemo();
            renderBadge();
        });
    } else {
        renderDemo();
        renderBadge();
    }
})();
