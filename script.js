// ===== VOXY MIX FUNIL GAMIFICADO - JAVASCRIPT COMPLETO =====

// ===== SISTEMA PRINCIPAL =====
class VoxyMixFunnel {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 7;
        this.userData = this.loadUserData();
        this.audioSystem = new AudioSystem();
        this.notificationSystem = new NotificationSystem();
        this.init();
    }

    init() {
        console.log('🎮 Voxy Mix Funil Inicializando...');
        
        // Inicializar sistemas
        this.audioSystem.init();
        this.updateProgress();
        this.updateBodyClass();
        
        // Inicializar etapas
        this.initStep1(); // Login
        this.initStep2(); // DNA Musical
        this.initStep3(); // Segmentação
        this.initStep4(); // Mecanismo Antigo
        this.initStep5(); // Presets Comuns
        this.initStep6(); // Presets Dinâmicos
        this.initStep7(); // Oferta
        
        console.log('✅ Voxy Mix Funil Pronto!');
    }

    // ===== NAVEGAÇÃO ENTRE ETAPAS =====
    goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.totalSteps) return;
        
        console.log(`📍 Navegando: Etapa ${this.currentStep} → Etapa ${stepNumber}`);
        
        // Ocultar etapa atual
        const currentStepElement = document.getElementById(`step${this.currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
        }
        
        // Mostrar nova etapa
        const newStepElement = document.getElementById(`step${stepNumber}`);
        if (newStepElement) {
            newStepElement.classList.add('active');
        }
        
        // Atualizar estado
        this.currentStep = stepNumber;
        this.updateProgress();
        this.updateBodyClass();
        
        // Som de transição
        this.audioSystem.playTransition();
        
        // Salvar progresso
        this.saveUserData();
    }

    updateProgress() {
        const progressBar = document.querySelector('.progress-fill');
        const stepIndicator = document.querySelector('.step-indicator');
        
        if (progressBar) {
            const percentage = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
            progressBar.style.width = `${percentage}%`;
        }
        
        if (stepIndicator) {
            stepIndicator.textContent = `Etapa ${this.currentStep}/${this.totalSteps}`;
        }
    }

    updateBodyClass() {
        // Controla se é etapa 1 (login) ou não
        if (this.currentStep === 1) {
            document.body.classList.add('step-1');
        } else {
            document.body.classList.remove('step-1');
        }
    }

    // ===== SISTEMA DE DADOS =====
    loadUserData() {
        const saved = localStorage.getItem('voxyMixUserData');
        return saved ? JSON.parse(saved) : {
            etapa1: {},
            etapa2: { dna: { fama: 0, dinheiro: 0, precisao: 0, velocidade: 0 }, perfil: '' },
            etapa3: { segmento: '', powerOn: false },
            etapa4: { score: 100, completed: false },
            etapa5: { score: 50, attempts: 0 },
            etapa6: { score: 25, completed: false },
            etapa7: { viewed: false }
        };
    }

    saveUserData() {
        localStorage.setItem('voxyMixUserData', JSON.stringify(this.userData));
        console.log('💾 Dados salvos:', this.userData);
    }

    // ===== ETAPA 1: LOGIN GAMIFICADO =====
    initStep1() {
        const form = document.getElementById('loginForm');
        const submitBtn = document.getElementById('submitBtn');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const passwordSuggestion = document.getElementById('passwordSuggestion');
        const successScreen = document.getElementById('successScreen');

        // Sugestão de senha
        const passwords = ['V7x#m2K9', 'P4@nW8qZ', 'M3$tR5oL', 'X9&fY2nU'];
        const suggestedPassword = passwords[Math.floor(Math.random() * passwords.length)];
        document.getElementById('suggestedPassword').textContent = suggestedPassword;

        // Click na sugestão
        if (passwordSuggestion) {
            passwordSuggestion.addEventListener('click', () => {
                passwordInput.value = suggestedPassword;
                passwordSuggestion.style.display = 'none';
                this.audioSystem.playClick();
            });
        }

        // Submit do form
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (!this.validateEmail(emailInput.value)) {
                    this.showInputError(emailInput, 'Digite um e-mail válido');
                    this.audioSystem.playError();
                    return;
                }
                
                if (passwordInput.value.length < 6) {
                    this.showInputError(passwordInput, 'Senha deve ter pelo menos 6 caracteres');
                    this.audioSystem.playError();
                    return;
                }

                // Salvar dados
                this.userData.etapa1 = {
                    email: emailInput.value,
                    timestamp: Date.now(),
                    completed: true
                };

                // Loading
                submitBtn.classList.add('loading');
                submitBtn.innerHTML = 'Ativando Sistema...';
                this.audioSystem.playProcessing();

                setTimeout(() => {
                    this.showLoginSuccess();
                }, 2000);
            });
        }

        // Auto-focus
        setTimeout(() => {
            if (emailInput) emailInput.focus();
        }, 1500);

        // Easter egg - Konami Code
        this.initKonamiCode();
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showInputError(input, message) {
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ff4444; font-size: 0.8rem; margin-top: 0.5rem;
            animation: fadeInUp 0.3s ease;
        `;
        
        input.parentNode.appendChild(errorElement);
        input.style.borderColor = '#ff4444';
        
        setTimeout(() => {
            if (errorElement.parentNode) errorElement.remove();
            input.style.borderColor = '';
        }, 3000);
    }

    showLoginSuccess() {
        document.querySelector('.login-form').style.display = 'none';
        document.querySelector('.logo-section').style.display = 'none';
        
        const successScreen = document.getElementById('successScreen');
        successScreen.classList.add('show');
        
        this.audioSystem.playSuccess();
        
        // Botão continuar
        document.getElementById('continueToNextStep')?.addEventListener('click', () => {
            this.goToStep(2);
        });
    }

    initKonamiCode() {
        let sequence = [];
        const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        
        document.addEventListener('keydown', (e) => {
            sequence.push(e.code);
            if (sequence.length > code.length) sequence.shift();
            
            if (JSON.stringify(sequence) === JSON.stringify(code)) {
                this.activateSecretMode();
                sequence = [];
            }
        });
    }

    activateSecretMode() {
        document.body.style.animation = 'rainbow 2s linear infinite';
        this.audioSystem.playSecret();
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 4000);
    }

    // ===== ETAPA 2: DNA MUSICAL =====
    initStep2() {
        const knobs = ['fama', 'dinheiro', 'precisao', 'velocidade'];
        const knobData = {};
        const MAX_POINTS = 300;
        let isDragging = false;
        let currentKnob = null;

        // Inicializar knobs
        knobs.forEach(knob => {
            const element = document.querySelector(`[data-knob="${knob}"]`);
            if (element) {
                knobData[knob] = {
                    value: this.userData.etapa2.dna[knob] || 0,
                    element,
                    indicator: element.querySelector('.knob-indicator'),
                    valueDisplay: element.querySelector('.knob-value')
                };

                // Event listeners
                element.addEventListener('mousedown', (e) => this.startKnobDrag(e, knob, knobData));
                element.addEventListener('touchstart', (e) => this.startKnobDrag(e, knob, knobData), { passive: false });
            }
        });

        // Global drag listeners
        document.addEventListener('mousemove', (e) => this.dragKnob(e, knobData, MAX_POINTS));
        document.addEventListener('mouseup', () => this.stopKnobDrag(knobData));
        document.addEventListener('touchmove', (e) => this.dragKnob(e, knobData, MAX_POINTS), { passive: false });
        document.addEventListener('touchend', () => this.stopKnobDrag(knobData));

        // Continue button
        document.getElementById('continueBtn')?.addEventListener('click', () => {
            if (this.validateDNA(knobData)) {
                this.completeDNA(knobData);
                this.goToStep(3);
            }
        });

        // Atualizar display inicial
        this.updateDNADisplay(knobData, MAX_POINTS);
    }

    startKnobDrag(e, knobType, knobData) {
        e.preventDefault();
        isDragging = true;
        currentKnob = knobType;
        
        knobData[knobType].element.classList.add('dragging');
        this.audioSystem.playClick();
    }

    dragKnob(e, knobData, MAX_POINTS) {
        if (!isDragging || !currentKnob) return;
        
        const knob = knobData[currentKnob];
        const rect = knob.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        
        const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
        let rotation = angle + 90; // Ajustar para posição vertical
        
        if (rotation < 0) rotation += 360;
        
        // Converter para valor (0-100)
        let newValue = Math.round((rotation / 270) * 100);
        newValue = Math.max(0, Math.min(100, newValue));
        
        // Verificar limite total
        const otherPoints = this.getTotalDNAPoints(knobData) - knob.value;
        if (otherPoints + newValue > MAX_POINTS) {
            newValue = MAX_POINTS - otherPoints;
        }
        
        knob.value = newValue;
        this.updateDNADisplay(knobData, MAX_POINTS);
    }

    stopKnobDrag(knobData) {
        if (isDragging && currentKnob) {
            knobData[currentKnob].element.classList.remove('dragging');
            this.audioSystem.playRelease();
        }
        isDragging = false;
        currentKnob = null;
    }

    getTotalDNAPoints(knobData) {
        return Object.values(knobData).reduce((sum, knob) => sum + knob.value, 0);
    }

    updateDNADisplay(knobData, MAX_POINTS) {
        const total = this.getTotalDNAPoints(knobData);
        
        // Atualizar knobs
        Object.keys(knobData).forEach(key => {
            const data = knobData[key];
            const rotation = (data.value / 100) * 270;
            if (data.indicator) {
                data.indicator.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
            }
            if (data.valueDisplay) {
                data.valueDisplay.textContent = data.value;
            }
        });

        // Atualizar contador de pontos
        const pointsDisplay = document.getElementById('pointsValue');
        if (pointsDisplay) {
            pointsDisplay.textContent = `${total}/300`;
            pointsDisplay.classList.toggle('warning', total > MAX_POINTS);
        }

        // Atualizar líquido
        this.updateLiquid(knobData, total, MAX_POINTS);
        
        // Atualizar resultado
        this.updateDNAResult(knobData, total);
        
        // Atualizar botão
        this.updateDNAButton(knobData, total, MAX_POINTS);
    }

    updateLiquid(knobData, total, MAX_POINTS) {
        const liquid = document.getElementById('liquid');
        if (!liquid) return;
        
        const percentage = Math.min((total / MAX_POINTS) * 70 + 30, 100);
        liquid.style.height = `${percentage}%`;
        
        // Cor baseada na combinação
        const { fama, dinheiro, precisao, velocidade } = knobData;
        let r = 0, g = 100, b = 255;
        
        r += (fama.value / 100) * 150;
        r += (dinheiro.value / 100) * 200;
        g += (dinheiro.value / 100) * 150;
        g += (precisao.value / 100) * 200;
        r += (velocidade.value / 100) * 200;
        
        r = Math.min(255, r);
        g = Math.min(255, g);
        b = Math.max(50, b - (r + g) / 4);
        
        liquid.style.background = `linear-gradient(180deg, 
            rgba(${r}, ${g}, ${b}, 0.8) 0%, 
            rgba(${r}, ${g}, ${b}, 0.4) 100%)`;
    }

    updateDNAResult(knobData, total) {
        const resultElement = document.getElementById('formulaResult');
        if (!resultElement) return;
        
        if (total === 0) {
            this.setDNAResult('🧪', 'Analisando...', 'Gire os knobs para criar sua fórmula');
            return;
        }
        
        const profile = this.determineDNAProfile(knobData);
        resultElement.classList.add('show');
        this.setDNAResult(profile.icon, profile.name, profile.title);
    }

    determineDNAProfile(knobData) {
        const { fama, dinheiro, precisao, velocidade } = knobData;
        const f = fama.value, d = dinheiro.value, p = precisao.value, v = velocidade.value;
        
        // Perfis extremos
        if (f >= 200) return { icon: '🎭', name: 'Holofote', title: 'Holofote Viciado' };
        if (d >= 200) return { icon: '💰', name: 'Cofre', title: 'Cofre Ambulante' };
        if (p >= 200) return { icon: '🎯', name: 'Perfeccionista', title: 'Perfeccionista Doente' };
        if (v >= 200) return { icon: '⚡', name: 'Rajada', title: 'Rajada Sonora' };
        
        // Duplas poderosas
        if (f >= 100 && d >= 100) return { icon: '👑', name: 'Popstar', title: 'Popstar Empresário' };
        if (p >= 100 && v >= 100) return { icon: '🔧', name: 'Cirurgião', title: 'Cirurgião Veloz' };
        if (f >= 100 && p >= 100) return { icon: '🏆', name: 'Referência', title: 'Referência Viva' };
        if (d >= 100 && v >= 100) return { icon: '🏧', name: 'Caixa', title: 'Caixa Registradora' };
        
        // Perfis ghost
        if (f <= 20 && d >= 80 && p >= 80) return { icon: '👻', name: 'Ghost', title: 'Ghost Premium' };
        
        // Default
        return { icon: '🎵', name: 'Híbrido', title: 'Perfil Híbrido' };
    }

    setDNAResult(icon, name, title) {
        const iconEl = document.querySelector('.result-icon');
        const nameEl = document.querySelector('.result-name');
        const titleEl = document.querySelector('.result-title');
        
        if (iconEl) iconEl.textContent = icon;
        if (nameEl) nameEl.textContent = name;
        if (titleEl) titleEl.textContent = title;
    }

    validateDNA(knobData) {
        const total = this.getTotalDNAPoints(knobData);
        const activeKnobs = Object.values(knobData).filter(k => k.value > 0).length;
        return total > 0 && total <= 300 && activeKnobs >= 2;
    }

    updateDNAButton(knobData, total, MAX_POINTS) {
        const continueBtn = document.getElementById('continueBtn');
        if (!continueBtn) return;
        
        const activeKnobs = Object.values(knobData).filter(k => k.value > 0).length;
        continueBtn.disabled = total === 0 || total > MAX_POINTS || activeKnobs < 2;
    }

    completeDNA(knobData) {
        // Salvar perfil
        this.userData.etapa2 = {
            dna: {
                fama: knobData.fama.value,
                dinheiro: knobData.dinheiro.value,
                precisao: knobData.precisao.value,
                velocidade: knobData.velocidade.value
            },
            perfil: this.determineDNAProfile(knobData).name,
            completed: true,
            timestamp: Date.now()
        };
        
        this.audioSystem.playSuccess();
        console.log('✅ DNA Musical completo:', this.userData.etapa2);
    }

    // ===== ETAPA 3: SEGMENTAÇÃO DINÂMICA =====
    initStep3() {
        const powerBtn = document.getElementById('powerBtn');
        const producerBtn = document.getElementById('producerBtn');
        const artistBtn = document.getElementById('artistBtn');
        const mainKnob = document.getElementById('mainKnob');
        const advanceBtn = document.getElementById('advanceBtn');
        
        let selectedSegments = new Set();
        let isPoweredOn = this.userData.etapa3.powerOn || false;
        let progress = 0;
        let isDragging = false;
        let currentRotation = 0;

        // Power button
        if (powerBtn) {
            powerBtn.addEventListener('click', () => {
                isPoweredOn = !isPoweredOn;
                this.updatePowerState(isPoweredOn);
                this.audioSystem.playClick();
            });
        }

        // Segment buttons
        if (producerBtn) {
            producerBtn.addEventListener('click', () => {
                if (isPoweredOn) this.toggleSegment('producer', selectedSegments);
            });
        }
        
        if (artistBtn) {
            artistBtn.addEventListener('click', () => {
                if (isPoweredOn) this.toggleSegment('artist', selectedSegments);
            });
        }

        // Knob
        if (mainKnob) {
            mainKnob.addEventListener('mousedown', (e) => this.startSegmentKnob(e, selectedSegments));
            mainKnob.addEventListener('touchstart', (e) => this.startSegmentKnob(e, selectedSegments), { passive: false });
        }

        document.addEventListener('mousemove', (e) => this.dragSegmentKnob(e, selectedSegments));
        document.addEventListener('mouseup', () => this.stopSegmentKnob());
        document.addEventListener('touchmove', (e) => this.dragSegmentKnob(e, selectedSegments), { passive: false });
        document.addEventListener('touchend', () => this.stopSegmentKnob());

        // Advance button
        if (advanceBtn) {
            advanceBtn.addEventListener('click', () => {
                if (progress >= 100 && selectedSegments.size > 0) {
                    this.completeSegmentation(selectedSegments);
                    this.goToStep(4);
                }
            });
        }

        // Inicializar estado
        this.updatePowerState(isPoweredOn);
        this.updateSegmentDisplay(selectedSegments, progress, isPoweredOn);
    }

    updatePowerState(isPoweredOn) {
        const powerBtn = document.getElementById('powerBtn');
        const mainRack = document.getElementById('mainRack');
        
        if (powerBtn) {
            powerBtn.textContent = isPoweredOn ? 'ON' : 'OFF';
            powerBtn.classList.toggle('powered-on', isPoweredOn);
        }
        
        if (mainRack) {
            mainRack.classList.toggle('powered-off', !isPoweredOn);
            
            if (isPoweredOn) {
                mainRack.classList.remove('powered-off');
                this.notificationSystem.showSystem('🎮', 'PARABÉNS', 'Você conseguiu ativar!');
            } else {
                mainRack.classList.add('powered-off');
                this.notificationSystem.showSystem('🔌', 'SISTEMA DESATIVADO', 'Todos os parâmetros foram resetados');
            }
        }
    }

    toggleSegment(segment, selectedSegments) {
        if (selectedSegments.has(segment)) {
            selectedSegments.delete(segment);
        } else {
            selectedSegments.add(segment);
        }
        
        this.updateSegmentButtons(selectedSegments);
        this.audioSystem.playClick();
    }

    updateSegmentButtons(selectedSegments) {
        const producerBtn = document.getElementById('producerBtn');
        const artistBtn = document.getElementById('artistBtn');
        const bothSelected = selectedSegments.size === 2;
        
        // Reset classes
        if (producerBtn) {
            producerBtn.classList.remove('active', 'both-selected');
            if (selectedSegments.has('producer')) {
                producerBtn.classList.add(bothSelected ? 'both-selected' : 'active');
            }
        }
        
        if (artistBtn) {
            artistBtn.classList.remove('active', 'both-selected');
            if (selectedSegments.has('artist')) {
                artistBtn.classList.add(bothSelected ? 'both-selected' : 'active');
            }
        }
    }

    startSegmentKnob(e, selectedSegments) {
        if (selectedSegments.size === 0) return;
        e.preventDefault();
        isDragging = true;
        
        const mainKnob = document.getElementById('mainKnob');
        if (mainKnob) {
            mainKnob.classList.add('dragging', 'active');
        }
        
        this.audioSystem.playClick();
    }

    dragSegmentKnob(e, selectedSegments) {
        if (!isDragging || selectedSegments.size === 0) return;
        if (e.cancelable) e.preventDefault();
        
        // Simular progresso baseado no movimento
        currentRotation += 2;
        if (currentRotation > 720) currentRotation = 720;
        
        progress = (currentRotation / 720) * 100;
        
        const indicator = document.querySelector('#mainKnob .knob-indicator');
        if (indicator) {
            indicator.style.transform = `translateX(-50%) rotate(${currentRotation}deg)`;
        }
        
        this.updateSegmentDisplay(selectedSegments, progress, true);
        
        if (Math.random() < 0.05) {
            this.showRandomSegmentNotification(selectedSegments);
        }
    }

    stopSegmentKnob() {
        if (isDragging) {
            const mainKnob = document.getElementById('mainKnob');
            if (mainKnob) {
                mainKnob.classList.remove('dragging');
            }
            this.audioSystem.playRelease();
        }
        isDragging = false;
    }

    updateSegmentDisplay(selectedSegments, progress, isPoweredOn) {
        // Atualizar valor do knob
        const knobValue = document.getElementById('knobValue');
        if (knobValue) {
            knobValue.textContent = Math.round(progress) + '%';
        }
        
        // Atualizar barra de progresso
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        // Atualizar LEDs
        const powerLed = document.getElementById('powerLed');
        const processLed = document.getElementById('processLed');
        const completeLed = document.getElementById('completeLed');
        
        if (powerLed) {
            powerLed.classList.toggle('power-on', selectedSegments.size > 0);
        }
        
        if (processLed) {
            processLed.classList.toggle('processing', progress > 0);
        }
        
        if (completeLed) {
            completeLed.classList.toggle('complete', progress >= 100);
        }
        
        // Atualizar botão
        this.updateSegmentButton(selectedSegments, progress, isPoweredOn);
    }

    updateSegmentButton(selectedSegments, progress, isPoweredOn) {
        const advanceBtn = document.getElementById('advanceBtn');
        if (!advanceBtn) return;
        
        advanceBtn.classList.remove('enabled');
        
        if (!isPoweredOn) {
            advanceBtn.textContent = '🔌 SISTEMA DESLIGADO';
        } else if (selectedSegments.size === 0) {
            advanceBtn.textContent = '🔒 Selecione um perfil para começar';
        } else if (progress >= 100) {
            advanceBtn.classList.add('enabled');
            advanceBtn.textContent = '🔓 CONTINUAR';
        } else {
            const remaining = Math.round(100 - progress);
            advanceBtn.textContent = `🔒 FALTAM ${remaining}% PARA DESTRAVAR`;
        }
    }

    showRandomSegmentNotification(selectedSegments) {
        const segments = Array.from(selectedSegments);
        if (segments.length === 0) return;
        
        const randomSegment = segments[Math.floor(Math.random() * segments.length)];
        const notifications = this.getSegmentNotifications(randomSegment);
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        
        this.notificationSystem.show(randomNotification.type, randomNotification.title, randomNotification.message);
        this.audioSystem.playNotification();
    }

    getSegmentNotifications(segment) {
        const notifications = {
            producer: [
                { type: 'positive', title: 'Novo Cliente', message: 'Cliente confirmou projeto de mixagem' },
                { type: 'positive', title: 'Projeto Concluído', message: 'Mixagem entregue com sucesso' },
                { type: 'negative', title: 'Projeto Cancelado', message: 'Cliente cancelou o projeto' }
            ],
            artist: [
                { type: 'positive', title: 'Spotify', message: 'Sua música bateu 10k streams hoje!' },
                { type: 'positive', title: 'Playlist Oficial', message: 'Você foi destaque em uma playlist' },
                { type: 'negative', title: 'Streams Caíram', message: 'Engagement diminuiu hoje' }
            ]
        };
        
        return notifications[segment] || [];
    }

    completeSegmentation(selectedSegments) {
        const segmentArray = Array.from(selectedSegments);
        let segmento = '';
        
        if (segmentArray.includes('producer') && segmentArray.includes('artist')) {
            segmento = 'ambos';
        } else if (segmentArray.includes('producer')) {
            segmento = 'produtor';
        } else if (segmentArray.includes('artist')) {
            segmento = 'artista';
        }
        
        this.userData.etapa3 = {
            segmento,
            powerOn: true,
            completed: true,
            timestamp: Date.now()
        };
        
        this.audioSystem.playSuccess();
        console.log('✅ Segmentação completa:', this.userData.etapa3);
    }

    // ===== ETAPA 4: MECANISMO ANTIGO COMUM =====
    initStep4() {
        let hasChosen = false;
        let currentScore = this.userData.etapa4.score || 100;
        
        this.renderChoicesStep4();
        this.updateScoreStep4(currentScore);
        
        // Continue button
        document.getElementById('continueBtn')?.addEventListener('click', () => {
            this.completeStep4();
            this.goToStep(5);
        });
    }

    renderChoicesStep4() {
        const grid = document.getElementById('choicesGrid');
        if (!grid) return;
        
        const segmento = this.userData.etapa3.segmento || 'ambos';
        const choices = this.getChoicesForSegment(segmento);
        
        grid.innerHTML = '';
        
        choices.forEach(choice => {
            const button = document.createElement('div');
            button.className = 'choice-button';
            button.innerHTML = `
                <span class="choice-icon">${choice.icon}</span>
                <div class="choice-name">${choice.name}</div>
                <div class="choice-desc">${choice.desc}</div>
            `;
            
            button.addEventListener('click', () => this.handleChoiceStep4(choice.id));
            grid.appendChild(button);
        });
    }

    getChoicesForSegment(segmento) {
        const choices = {
            produtor: [
                { id: 'setup', icon: '🎛️', name: 'Investir em Setup Pro', desc: 'Equipamentos e plugins top de linha' },
                { id: 'curso', icon: '📚', name: 'Curso Avançado de Mix', desc: 'Aprender técnicas dos grandes' }
            ],
            artista: [
                { id: 'produtor_caro', icon: '💰', name: 'Produtor Premium', desc: 'Contratar o melhor do mercado' },
                { id: 'produtor_barato', icon: '💸', name: 'Produtor Econômico', desc: 'Economizar na produção' }
            ],
            ambos: [
                { id: 'tudo_sozinho', icon: '🎯', name: 'Fazer Tudo Sozinho', desc: 'Aprender e produzir do zero' },
                { id: 'parceria', icon: '🤝', name: 'Parceria 50/50', desc: 'Dividir custos e trabalho' }
            ]
        };
        
        return choices[segmento] || choices.ambos;
    }

    handleChoiceStep4(choiceId) {
        if (this.userData.etapa4.completed) return;
        
        // Desabilitar botões
        document.querySelectorAll('.choice-button').forEach(btn => {
            btn.classList.add('disabled');
        });
        
        // Animação de erro
        const container = document.getElementById('choiceContainer');
        if (container) {
            container.classList.add('error-shake', 'glitch');
        }
        
        // Som de erro
        this.audioSystem.playError();
        
        // Reduzir pontuação
        const newScore = Math.max(0, this.userData.etapa4.score - 50);
        this.updateScoreStep4(newScore);
        
        // Mostrar resultado
        setTimeout(() => {
            if (container) {
                container.classList.remove('error-shake', 'glitch');
            }
            this.showResultStep4(choiceId);
        }, 800);
    }

    showResultStep4(choiceId) {
        const container = document.getElementById('choiceContainer');
        if (!container) return;
        
        const consequences = this.getConsequencesStep4(choiceId);
        
        const resultHTML = `
            <div class="result-content">
                <div class="result-header">
                    <span class="result-icon">⚠️</span>
                    <h3 class="result-title">Método Falhou!</h3>
                </div>
                
                <ul class="consequences-list">
                    ${consequences.map((cons, index) => `
                        <li class="consequence-item" style="animation-delay: ${index * 0.2}s">
                            ${cons}
                        </li>
                    `).join('')}
                </ul>
                
                <div class="warning-message">
                    VOCÊ SÓ TEM MAIS UMA CHANCE!
                </div>
            </div>
        `;
        
        container.innerHTML = resultHTML;
        container.style.background = 'linear-gradient(145deg, #1f1414, #141010)';
        container.style.borderColor = 'rgba(255, 68, 68, 0.3)';
        
        // Mostrar botão continuar
        setTimeout(() => {
            const continueSection = document.getElementById('continueSection');
            if (continueSection) {
                continueSection.classList.add('show');
            }
        }, 2000);
    }

    getConsequencesStep4(choiceId) {
        const dna = this.userData.etapa2.dna;
        
        const consequences = {
            setup: [
                'Setup de R$20k mas o som continua amador',
                dna.velocidade > 60 ? 'Perdeu 3 meses configurando = 15 projetos perdidos' : 'Investimento não trouxe retorno = prejuízo',
                'Cliente: "Prefiro o produtor antigo que usa FL pirata"'
            ],
            curso: [
                '6 meses de curso e ainda não sabe mixar direito',
                dna.velocidade > 60 ? 'Perdeu 30 clientes para a concorrência' : 'Teoria perfeita mas na prática nada funciona',
                'Descobriu que o "guru" do curso usa presets prontos'
            ]
        };
        
        return consequences[choiceId] || ['Falha crítica no sistema', 'Perdeu tempo e dinheiro'];
    }

    updateScoreStep4(newScore) {
        this.userData.etapa4.score = newScore;
        
        const fill = document.getElementById('scoreFill');
        const text = document.getElementById('scoreText');
        
        if (text) text.textContent = `${newScore}/100`;
        if (fill) {
            fill.style.width = `${newScore}%`;
            
            if (newScore <= 30) {
                fill.classList.add('danger');
                fill.classList.remove('warning');
            } else if (newScore <= 60) {
                fill.classList.add('warning');
                fill.classList.remove('danger');
            }
        }
    }

    completeStep4() {
        this.userData.etapa4.completed = true;
        this.userData.etapa4.timestamp = Date.now();
        
        console.log('✅ Etapa 4 completa:', this.userData.etapa4);
    }

    // ===== ETAPA 5: PRESETS COMUNS =====
    initStep5() {
        this.generateRandomLocksStep5();
        this.renderPresetsStep5();
        this.updateScoreStep5(this.userData.etapa5.score || 50);
        this.createWaveformStep5();
        
        // Continue button
        document.getElementById('continueBtn')?.addEventListener('click', () => {
            this.completeStep5();
            this.goToStep(6);
        });
    }

    generateRandomLocksStep5() {
        const indices = [0, 1, 2, 3];
        const shuffled = indices.sort(() => Math.random() - 0.5);
        const lockedIndices = shuffled.slice(0, 2);
        
        this.presetConfigs = [
            { id: 'radio_ready', icon: '📻', name: 'Radio Ready Pro', desc: 'Som de rádio instantâneo', locked: false },
            { id: 'vintage_warm', icon: '🎙️', name: 'Vintage Warmth', desc: 'Calor analógico clássico', locked: false },
            { id: 'crystal_clear', icon: '💎', name: 'Crystal Clear HD', desc: 'Clareza máxima e brilho', locked: false },
            { id: 'bass_boost', icon: '🔊', name: 'Bass Booster X', desc: 'Graves poderosos', locked: false }
        ];
        
        lockedIndices.forEach(index => {
            this.presetConfigs[index].locked = true;
        });
    }

    renderPresetsStep5() {
        const grid = document.getElementById('presetGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.presetConfigs.forEach(preset => {
            const slot = document.createElement('div');
            slot.className = `preset-slot ${preset.locked ? 'locked' : ''}`;
            
            if (preset.locked) {
                slot.innerHTML = `
                    <span class="preset-icon">🔒</span>
                    <div class="preset-name">${preset.name}</div>
                    <div class="preset-desc">${preset.desc}</div>
                    <div class="locked-message">Incompatível com sua DAW</div>
                `;
            } else {
                slot.innerHTML = `
                    <span class="preset-icon">${preset.icon}</span>
                    <div class="preset-name">${preset.name}</div>
                    <div class="preset-desc">${preset.desc}</div>
                `;
                
                slot.addEventListener('click', () => this.handlePresetClickStep5(preset.id));
            }
            
            grid.appendChild(slot);
        });
    }

    createWaveformStep5() {
        const waveform = document.getElementById('waveform');
        if (!waveform) return;
        
        waveform.innerHTML = '';
        
        for (let i = 0; i < 50; i++) {
            const bar = document.createElement('div');
            bar.className = 'waveform-bar';
            bar.style.height = `${Math.random() * 60 + 20}%`;
            waveform.appendChild(bar);
        }
    }

    handlePresetClickStep5(presetId) {
        if (this.userData.etapa5.completed) return;
        
        this.userData.etapa5.attempts++;
        
        // Desabilitar slots
        document.querySelectorAll('.preset-slot').forEach(slot => {
            slot.style.pointerEvents = 'none';
            slot.style.opacity = '0.5';
        });
        
        // Mostrar waveform
        const waveformDisplay = document.getElementById('waveformDisplay');
        if (waveformDisplay) {
            waveformDisplay.classList.add('show');
        }
        
        // Simular processamento
        setTimeout(() => {
            // Erro no waveform
            const waveform = document.getElementById('waveform');
            if (waveform) {
                waveform.classList.add('error');
            }
            
            // Flash de erro
            const container = document.getElementById('presetContainer');
            if (container) {
                container.classList.add('error-flash');
            }
            
            // Som de falha
            this.audioSystem.playFailure();
            
            // Reduzir pontuação
            const newScore = Math.max(0, this.userData.etapa5.score - 25);
            this.updateScoreStep5(newScore);
            
            // Mostrar resultado
            setTimeout(() => {
                this.showFailureResultStep5(presetId);
            }, 500);
        }, 1500);
    }

    showFailureResultStep5(presetId) {
        const container = document.getElementById('presetContainer');
        if (!container) return;
        
        const failures = this.getPresetFailuresStep5(presetId);
        
        const resultHTML = `
            <div class="result-content">
                <div class="result-header">
                    <span class="result-icon">💀</span>
                    <h3 class="result-title">Preset Comum = Desastre Total!</h3>
                </div>
                
                <ul class="failure-list">
                    <li class="failure-item" style="animation-delay: 0.2s">
                        ${failures[0]}
                    </li>
                    <li class="failure-item" style="animation-delay: 0.4s">
                        ${failures[1]}
                    </li>
                </ul>
                
                <div class="critical-warning">
                    SISTEMA EM COLAPSO!<br>
                    MÉTODO TRADICIONAL FALHOU COMPLETAMENTE
                </div>
            </div>
        `;
        
        container.innerHTML = resultHTML;
        container.style.background = 'linear-gradient(145deg, #2a1414, #1a0a0a)';
        container.style.borderColor = 'rgba(255, 0, 0, 0.5)';
        
        // Mostrar botão continuar
        setTimeout(() => {
            const continueSection = document.getElementById('continueSection');
            if (continueSection) {
                continueSection.classList.add('show');
            }
        }, 2000);
    }

    getPresetFailuresStep5(presetId) {
        const dna = this.userData.etapa2.dna;
        
        const failures = {
            radio_ready: [
                'Mix ficou comprimida demais, perdeu toda dinâmica',
                dna.fama > 60 ? 'Som plastificado = Playlist rejeitou' : 'Cliente não pagou'
            ],
            vintage_warm: [
                'Adicionou ruído e distorção desnecessária',
                dna.velocidade > 60 ? 'Piorou tudo = Começar do zero' : 'Preset não se adaptou'
            ]
        };
        
        return failures[presetId] || ['Preset incompatível', 'Resultado desastroso'];
    }

    updateScoreStep5(newScore) {
        this.userData.etapa5.score = newScore;
        
        const fill = document.getElementById('scoreFill');
        const text = document.getElementById('scoreText');
        
        if (text) text.textContent = `${newScore}/100`;
        if (fill) {
            fill.style.width = `${newScore}%`;
            if (newScore === 0) {
                fill.classList.add('danger');
            }
        }
    }

    completeStep5() {
        this.userData.etapa5.completed = true;
        this.userData.etapa5.timestamp = Date.now();
        
        console.log('✅ Etapa 5 completa:', this.userData.etapa5);
    }

    // ===== ETAPA 6: PRESETS DINÂMICOS =====
    initStep6() {
        let hasCompleted = false;
        let currentScore = this.userData.etapa6.score || 25;
        
        this.createWaveformStep6();
        this.renderProblemsStep6();
        this.renderKnobsStep6();
        this.updateScoreStep6(currentScore);
        
        // Continue button
        document.getElementById('continueBtn')?.addEventListener('click', () => {
            this.completeStep6();
            this.goToStep(7);
        });
    }

    createWaveformStep6() {
        const container = document.getElementById('waveformContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        for (let i = 0; i < 30; i++) {
            const bar = document.createElement('div');
            bar.className = 'waveform-bar';
            bar.style.height = `${Math.random() * 40 + 20}%`;
            container.appendChild(bar);
        }
    }

    renderProblemsStep6() {
        const grid = document.getElementById('problemsGrid');
        if (!grid) return;
        
        const problems = this.getVocalProblemsStep6();
        
        grid.innerHTML = '';
        
        problems.forEach(problem => {
            const item = document.createElement('div');
            item.className = 'problem-item';
            item.id = `problem-${problem.id}`;
            item.innerHTML = `
                <span class="problem-icon">${problem.icon}</span>
                <div class="problem-name">${problem.name}</div>
            `;
            grid.appendChild(item);
        });
    }

    getVocalProblemsStep6() {
        const segmento = this.userData.etapa3.segmento;
        const dna = this.userData.etapa2.dna;
        const problems = [];
        
        // Problema 1: Baseado no segmento e DNA
        if (segmento === 'artista' || segmento === 'ambos') {
            if (dna.fama > 60) {
                problems.push({ id: 'muddy', icon: '🔇', name: 'Som Abafado' });
            } else if (dna.precisao > 60) {
                problems.push({ id: 'harsh', icon: '⚡', name: 'Frequências Ásperas' });
            } else {
                problems.push({ id: 'thin', icon: '📻', name: 'Voz Fina' });
            }
        } else {
            problems.push({ id: 'muddy', icon: '🔇', name: 'Som Abafado' });
        }
        
        // Problema 2: Sempre relacionado a timing/dinâmica
        if (dna.velocidade > 60) {
            problems.push({ id: 'timing', icon: '⏱️', name: 'Timing Irregular' });
        } else {
            problems.push({ id: 'presence', icon: '👤', name: 'Falta Presença' });
        }
        
        return problems;
    }

    renderKnobsStep6() {
        const grid = document.getElementById('knobsGrid');
        if (!grid) return;
        
        const knobs = this.getKnobControlsStep6();
        
        grid.innerHTML = '';
        
        knobs.forEach(knob => {
            const control = document.createElement('div');
            control.className = 'knob-control';
            
            control.innerHTML = `
                <div class="knob-visual ${knob.correct ? 'correct' : ''}" data-knob-id="${knob.id}">
                    <div class="knob-indicator"></div>
                </div>
                <div class="knob-label">${knob.label}</div>
            `;
            
            if (knob.correct) {
                control.addEventListener('click', () => this.handleCorrectKnobStep6(knob));
            } else {
                control.addEventListener('click', () => this.handleNeutralKnobStep6(knob));
            }
            
            grid.appendChild(control);
        });
    }

    getKnobControlsStep6() {
        const problems = this.getVocalProblemsStep6();
        const knobs = [];
        
        // Knob 1: Sempre correto - baseado no primeiro problema
        const firstProblem = problems[0].id;
        
        switch(firstProblem) {
            case 'muddy':
                knobs.push({ id: 'clarify', label: 'Clarear', correct: true, targetProblem: 'muddy' });
                break;
            case 'harsh':
                knobs.push({ id: 'smooth', label: 'Suavizar', correct: true, targetProblem: 'harsh' });
                break;
            case 'thin':
                knobs.push({ id: 'fatten', label: 'Encorpar', correct: true, targetProblem: 'thin' });
                break;
        }
        
        // Knob 2: Sempre correto - baseado no segundo problema
        const secondProblem = problems[1].id;
        
        switch(secondProblem) {
            case 'timing':
                knobs.push({ id: 'sync', label: 'Sincronizar', correct: true, targetProblem: 'timing' });
                break;
            case 'presence':
                knobs.push({ id: 'enhance', label: 'Realçar', correct: true, targetProblem: 'presence' });
                break;
        }
        
        // Knobs neutros
        knobs.push({ id: 'reverb', label: 'Ambiência', correct: false });
        knobs.push({ id: 'delay', label: 'Delay', correct: false });
        
        return knobs;
    }

    handleCorrectKnobStep6(knob) {
        if (this.userData.etapa6.completed) return;
        
        // Marcar problema como resolvido
        const problemElement = document.getElementById(`problem-${knob.targetProblem}`);
        if (problemElement) {
            problemElement.classList.add('solved');
        }
        
        // Melhorar waveform
        const waveformBars = document.querySelectorAll('.waveform-bar');
        waveformBars.forEach(bar => {
            bar.classList.add('improving');
        });
        
        // Feedback positivo
        const feedbackText = document.getElementById('feedbackText');
        if (feedbackText) {
            feedbackText.textContent = `✨ ${knob.label} aplicado! Melhoria detectada...`;
            feedbackText.classList.add('success');
        }
        
        // Som de sucesso
        this.audioSystem.playSuccess();
        
        // Recuperar pontuação
        const newScore = Math.min(100, this.userData.etapa6.score + 37);
        this.updateScoreStep6(newScore);
        
        // Verificar se completou
        setTimeout(() => {
            this.checkAllProblemsResolvedStep6();
        }, 1000);
    }

    handleNeutralKnobStep6(knob) {
        if (this.userData.etapa6.completed) return;
        
        // Feedback neutro
        const feedbackText = document.getElementById('feedbackText');
        if (feedbackText) {
            feedbackText.textContent = `${knob.label} ajustado. Continue otimizando...`;
            feedbackText.classList.remove('success');
        }
        
        // Som neutro
        this.audioSystem.playClick();
    }

    checkAllProblemsResolvedStep6() {
        const allProblems = document.querySelectorAll('.problem-item');
        const solvedProblems = document.querySelectorAll('.problem-item.solved');
        
        if (solvedProblems.length >= 2) {
            this.completeSuccessStep6();
        }
    }

    completeSuccessStep6() {
        if (this.userData.etapa6.completed) return;
        
        this.userData.etapa6.completed = true;
        
        // Recuperar pontuação total
        this.updateScoreStep6(100);
        
        // Feedback final
        const feedbackText = document.getElementById('feedbackText');
        if (feedbackText) {
            feedbackText.textContent = '🎯 Preset Dinâmico calibrado perfeitamente!';
            feedbackText.classList.add('success');
        }
        
        // Ocultar controles
        const controlsSection = document.getElementById('controlsSection');
        if (controlsSection) {
            controlsSection.classList.add('hidden');
        }
        
        // Mostrar seção de sucesso
        setTimeout(() => {
            const successSection = document.getElementById('successSection');
            if (successSection) {
                successSection.classList.add('show');
            }
        }, 1000);
        
        // Som de vitória
        this.audioSystem.playVictory();
    }

    updateScoreStep6(newScore) {
        this.userData.etapa6.score = newScore;
        
        const fill = document.getElementById('scoreFill');
        const text = document.getElementById('scoreText');
        
        if (text) text.textContent = `${newScore}/100`;
        if (fill) {
            fill.style.width = `${newScore}%`;
            
            if (newScore >= 100) {
                fill.classList.add('recovering');
            }
        }
    }

    completeStep6() {
        this.userData.etapa6.timestamp = Date.now();
        this.userData.etapa6.problems_solved = document.querySelectorAll('.problem-item.solved').length;
        
        console.log('✅ Etapa 6 completa:', this.userData.etapa6);
    }

    // ===== ETAPA 7: OFERTA =====
    initStep7() {
        this.personalizeOffer();
        this.setupOfferInteractions();
        
        // Marcar como visualizada
        this.userData.etapa7.viewed = true;
        this.userData.etapa7.timestamp = Date.now();
    }

    personalizeOffer() {
        // Personalização baseada no DNA e segmento
        const dna = this.userData.etapa2.dna;
        const segmento = this.userData.etapa3.segmento;
        
        console.log('🎯 Personalizando oferta:', { dna, segmento });
        
        // Ajustar headline baseado no perfil dominante
        const dominantTrait = this.getDominantTrait(dna);
        this.adjustOfferHeadline(dominantTrait, segmento);
    }

    getDominantTrait(dna) {
        const traits = [
            { name: 'fama', value: dna.fama },
            { name: 'dinheiro', value: dna.dinheiro },
            { name: 'precisao', value: dna.precisao },
            { name: 'velocidade', value: dna.velocidade }
        ];
        
        return traits.reduce((max, trait) => trait.value > max.value ? trait : max, traits[0]);
    }

    adjustOfferHeadline(dominantTrait, segmento) {
        const headlines = {
            fama: "Seja o Artista que Todos Querem",
            dinheiro: "Transforme Cada Projeto em LUCRO",
            precisao: "Qualidade de Estúdio Milionário",
            velocidade: "10x Mais Projetos, Mesmo Tempo"
        };
        
        const headlineElement = document.getElementById('heroHeadline');
        if (headlineElement && headlines[dominantTrait.name]) {
            // Manter o texto original, mas poderia personalizar aqui
            console.log(`💡 Headline sugerida: ${headlines[dominantTrait.name]}`);
        }
    }

    setupOfferInteractions() {
        // Toggle comparison
        this.setupComparison();
        
        // FAQ
        this.setupFAQ();
        
        // CTA Button
        const ctaButton = document.getElementById('ctaButton');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPortalAnimation();
            });
        }
        
        // Bonus cards
        this.setupBonusCards();
    }

    setupComparison() {
        const toggleButtons = document.querySelectorAll('.toggle-button');
        const comparisonCards = document.querySelectorAll('.comparison-card');

        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const type = button.dataset.type;
                
                // Update buttons
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update cards
                comparisonCards.forEach(card => {
                    card.classList.remove('show');
                    if (card.classList.contains(type)) {
                        setTimeout(() => card.classList.add('show'), 100);
                    }
                });
                
                this.audioSystem.playClick();
            });
        });
    }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Fechar todos
                    faqItems.forEach(i => i.classList.remove('active'));
                    
                    // Abrir clicado
                    if (!isActive) {
                        item.classList.add('active');
                    }
                    
                    this.audioSystem.playClick();
                });
            }
        });
    }

    setupBonusCards() {
        const bonusCards = document.querySelectorAll('.bonus-card');
        
        bonusCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('expanded');
                this.audioSystem.playClick();
            });
        });
    }

    showPortalAnimation() {
        const portalOverlay = document.getElementById('portalOverlay');
        if (!portalOverlay) return;
        
        portalOverlay.classList.add('show');
        
        this.createPortalParticles();
        this.audioSystem.playPortal();
        
        setTimeout(() => {
            // Simular redirecionamento para checkout
            alert('🎉 Redirecionando para checkout...\n\nEm produção, aqui seria a URL real do pagamento.');
            portalOverlay.classList.remove('show');
        }, 3000);
    }

    createPortalParticles() {
        const container = document.getElementById('portalParticles');
        if (!container) return;
        
        container.innerHTML = '';

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (3 + Math.random() * 2) + 's';
            container.appendChild(particle);
        }
    }
}

// ===== SISTEMA DE ÁUDIO =====
class AudioSystem {
    constructor() {
        this.audioContext = null;
        this.sounds = {
            // Obrigatórios
            cash: 'assets/sounds/notification-Cash.mp3',
            iphone: 'assets/sounds/som-iphone-novo.MP3',
            instagram: 'assets/sounds/som-instagram.MP3',
            
            // Win/Success
            success: 'assets/sounds/notification-right-answer-win.MP3',
            shiny: 'assets/sounds/notification-shiny-win.MP3',
            vintage: 'assets/sounds/notification-vintage-win.MP3',
            
            // Error/Lose
            error: 'assets/sounds/notification-lose-error.MP3',
            
            // Transições
            unlock: 'assets/sounds/transition-ding-unlock.MP3',
            woosh: 'assets/sounds/transition-woosh.MP3'
        };
        this.loadedSounds = {};
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🔊 Sistema de áudio inicializado');
            
            // Preload principais sons
            this.preloadSound('success');
            this.preloadSound('error');
            this.preloadSound('unlock');
            
        } catch (e) {
            console.warn('⚠️ Web Audio API não suportada:', e);
        }
        
        // Auto-resume context no primeiro clique
        document.addEventListener('click', () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        }, { once: true });
    }

    preloadSound(soundKey) {
        const soundPath = this.sounds[soundKey];
        if (!soundPath) return;
        
        const audio = new Audio(soundPath);
        audio.preload = 'auto';
        this.loadedSounds[soundKey] = audio;
    }

    playSound(soundKey, volume = 0.3) {
        try {
            const soundPath = this.sounds[soundKey];
            if (!soundPath) {
                console.warn(`⚠️ Som não encontrado: ${soundKey}`);
                return;
            }
            
            let audio = this.loadedSounds[soundKey];
            if (!audio) {
                audio = new Audio(soundPath);
                this.loadedSounds[soundKey] = audio;
            }
            
            audio.volume = volume;
            audio.currentTime = 0;
            audio.play().catch(e => {
                console.warn(`⚠️ Erro ao tocar som ${soundKey}:`, e);
                this.fallbackBeep(soundKey);
            });
            
        } catch (e) {
            console.warn(`⚠️ Erro no sistema de áudio:`, e);
            this.fallbackBeep(soundKey);
        }
    }

    fallbackBeep(soundKey) {
        if (!this.audioContext) return;
        
        try {
            const frequencies = {
                success: [523, 659, 784],
                error: [220, 180],
                click: [800],
                notification: [440, 554],
                portal: [261, 329, 392, 523]
            };
            
            const freq = frequencies[soundKey] || [440];
            
            freq.forEach((f, index) => {
                const osc = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                osc.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                osc.frequency.setValueAtTime(f, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                
                const startTime = this.audioContext.currentTime + (index * 0.1);
                osc.start(startTime);
                osc.stop(startTime + 0.3);
            });
            
        } catch (e) {
            console.warn('⚠️ Fallback beep falhou:', e);
        }
    }

    // ===== MÉTODOS ESPECÍFICOS =====
    playClick() {
        this.playSound('success', 0.2);
    }

    playSuccess() {
        this.playSound('success', 0.4);
    }

    playError() {
        this.playSound('error', 0.3);
    }

    playFailure() {
        this.playSound('error', 0.5);
    }

    playNotification() {
        this.playSound('iphone', 0.3);
    }

    playCash() {
        this.playSound('cash', 0.4);
    }

    playTransition() {
        this.playSound('woosh', 0.2);
    }

    playUnlock() {
        this.playSound('unlock', 0.4);
    }

    playPortal() {
        this.playSound('unlock', 0.5);
    }

    playVictory() {
        this.playSound('shiny', 0.5);
    }

    playProcessing() {
        this.playSound('vintage', 0.2);
    }

    playRelease() {
        this.playSound('success', 0.1);
    }

    playSecret() {
        this.playSound('shiny', 0.3);
    }
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
class NotificationSystem {
    constructor() {
        this.isActive = false;
        this.queue = [];
    }

    show(type, title, message, duration = 3000) {
        if (this.isActive) {
            this.queue.push({ type, title, message, duration });
            return;
        }
        
        this.isActive = true;
        
        const notification = document.getElementById('globalNotification');
        if (!notification) return;
        
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">${this.getIcon(type)}</div>
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
        `;
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            this.isActive = false;
            
            // Processar próxima na fila
            if (this.queue.length > 0) {
                const next = this.queue.shift();
                setTimeout(() => {
                    this.show(next.type, next.title, next.message, next.duration);
                }, 300);
            }
        }, duration);
    }

    showSystem(icon, title, message, duration = 3000) {
        const systemNotification = document.getElementById('systemNotification');
        if (!systemNotification) return;
        
        systemNotification.innerHTML = `
            <div class="system-notification-icon">${icon}</div>
            <div class="system-notification-title">${title}</div>
            <div class="system-notification-message">${message}</div>
        `;
        
        systemNotification.classList.add('show');
        
        setTimeout(() => {
            systemNotification.classList.remove('show');
        }, duration);
    }

    getIcon(type) {
        const icons = {
            positive: '✅',
            negative: '❌',
            completion: '🏆',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        return icons[type] || 'ℹ️';
    }
}

// ===== INICIALIZAÇÃO GLOBAL =====
let voxyMixApp;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando Voxy Mix Funil Gamificado...');
    voxyMixApp = new VoxyMixFunnel();
    
    // Expor funções globais para uso em HTML
    window.goToStep = (step) => voxyMixApp.goToStep(step);
    window.continueToNextStep = () => voxyMixApp.goToStep(voxyMixApp.currentStep + 1);
});

// ===== TRATAMENTO DE ERROS GLOBAL =====
window.addEventListener('error', (e) => {
    console.error('❌ Erro no Voxy Mix:', e);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Promise rejeitada no Voxy Mix:', e);
});

console.log('📄 script.js carregado com sucesso!');
