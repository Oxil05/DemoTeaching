/* ==========================================================================
   IT21-PT1 Module 1 Interactive Presentation Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------------------------
    // 1. Slide Navigation & View Mode State
    // --------------------------------------------------------------------------
    const slides = document.querySelectorAll('.section-block');
    const navBtns = document.querySelectorAll('.nav-btn');
    const btnPrev = document.getElementById('btn-prev-slide');
    const btnNext = document.getElementById('btn-next-slide');
    const currentSlideNumEl = document.getElementById('current-slide-num');
    const totalSlidesNumEl = document.getElementById('total-slides-num');
    const progressBar = document.getElementById('progress-bar');
    const viewModeToggleBtn = document.getElementById('view-mode-toggle');
    const viewModeLabel = document.getElementById('view-mode-label');

    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    let isScrollMode = false;

    if (totalSlidesNumEl) totalSlidesNumEl.textContent = totalSlides;

    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        currentSlideIndex = index;

        slides.forEach((slide, idx) => {
            slide.classList.toggle('active-slide', idx === currentSlideIndex);
        });

        navBtns.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentSlideIndex);
        });

        if (currentSlideNumEl) currentSlideNumEl.textContent = currentSlideIndex + 1;
        if (progressBar) progressBar.style.width = `${((currentSlideIndex + 1) / totalSlides) * 100}%`;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Nav button clicks
    navBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            if (isScrollMode) {
                const targetId = btn.dataset.target;
                const targetEl = document.getElementById(targetId);
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
            } else {
                goToSlide(idx);
            }
        });
    });

    if (btnPrev) btnPrev.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
    if (btnNext) btnNext.addEventListener('click', () => goToSlide(currentSlideIndex + 1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isScrollMode) return;
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
            goToSlide(currentSlideIndex + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            goToSlide(currentSlideIndex - 1);
        }
    });

    // View Mode Toggle (Presentation vs Scrollable Module)
    if (viewModeToggleBtn) {
        viewModeToggleBtn.addEventListener('click', () => {
            isScrollMode = !isScrollMode;
            document.body.classList.toggle('scroll-mode', isScrollMode);
            if (viewModeLabel) {
                viewModeLabel.textContent = isScrollMode ? 'Scroll Module Mode' : 'Presentation Mode';
            }
        });
    }

    // --------------------------------------------------------------------------
    // 2. Interactive Von Neumann Architecture Inspector & Simulation
    // --------------------------------------------------------------------------
    const archNodes = document.querySelectorAll('.arch-node');
    const inspectorTitle = document.getElementById('inspector-title');
    const inspectorDesc = document.getElementById('inspector-desc');
    const btnSimulateBus = document.getElementById('btn-simulate-bus');

    const componentDetails = {
        cpu: {
            title: "Central Processing Unit (CPU)",
            desc: "The primary computing engine composed of the Control Unit (CU) and Arithmetic Logic Unit (ALU). It reads memory cell contents, decodes instructions, executes calculations, and manages register transfers."
        },
        memory: {
            title: "Central Memory (Random Access Memory - RAM)",
            desc: "Fabricated with semiconductor cells to hold active instructions and operational data. RAM is volatile — it loses all stored data when electrical power is disconnected."
        },
        io: {
            title: "Input/Output (I/O) & Auxiliary Memory Units",
            desc: "Interfaces that allow the processor to communicate with external peripherals. Auxiliary storage (magnetic media/files) provides persistent storage organized into fixed-size registers."
        }
    };

    archNodes.forEach(node => {
        node.addEventListener('click', () => {
            archNodes.forEach(n => n.classList.remove('active-node'));
            node.classList.add('active-node');

            const compKey = node.dataset.component;
            if (componentDetails[compKey]) {
                inspectorTitle.textContent = componentDetails[compKey].title;
                inspectorDesc.textContent = componentDetails[compKey].desc;
            }
        });
    });

    if (btnSimulateBus) {
        btnSimulateBus.addEventListener('click', () => {
            const packet1 = document.querySelector('.packet-1');
            const packet2 = document.querySelector('.packet-2');
            
            if (packet1 && packet2) {
                packet1.style.transition = 'none';
                packet2.style.transition = 'none';
                packet1.style.left = '0%';
                packet2.style.left = '100%';
                packet1.style.opacity = '1';
                packet2.style.opacity = '1';

                setTimeout(() => {
                    packet1.style.transition = 'all 1.5s ease-in-out';
                    packet2.style.transition = 'all 1.5s ease-in-out';
                    packet1.style.left = '100%';
                    packet2.style.left = '0%';
                }, 50);

                setTimeout(() => {
                    packet1.style.opacity = '0';
                    packet2.style.opacity = '0';
                }, 1600);
            }
        });
    }

    // --------------------------------------------------------------------------
    // 3. Computer Generations Interactive Explorer
    // --------------------------------------------------------------------------
    const genTabs = document.querySelectorAll('.gen-tab');
    const genDisplayCard = document.getElementById('gen-display-card');

    const generationsData = {
        1: {
            title: "First Generation Computers (1940s)",
            tech: "Vacuum Tubes / Electronic Valves",
            description: "Built using massive electronic vacuum tubes. Architecture relied on mechanical language programming.",
            features: [
                "Primary Tech: Vacuum Tubes",
                "Size: Big & Clumsy physical footprint",
                "Power: High electricity consumption & required heavy AC cooling",
                "Programming: Machine / Mechanical Language",
                "Reliability: Frequent electricity failures occurred",
                "Example System: UNIVAC (Universal Automatic Computer)"
            ]
        },
        2: {
            title: "Second Generation Computers",
            tech: "Transistors & Core Memory",
            description: "Replaced fragile vacuum tubes with solid-state transistors, drastically boosting read/write speeds and system reliability.",
            features: [
                "Primary Tech: Transistors & Core Memory",
                "Operating System: First Operating System was developed",
                "Programming: Machine & Assembly Language",
                "Storage: Magnetic tapes & magnetic disks introduced",
                "Efficiency: Smaller size, lower heat, consumed less electricity",
                "Example System: ATLAS Computer"
            ]
        },
        3: {
            title: "Third Generation Computers (1960s)",
            tech: "Integrated Circuits (SSI & MSI)",
            description: "Emerged in early 1960s introducing simple Integrated Circuits (IC) combining multiple transistors onto single silicon chips.",
            features: [
                "Primary Tech: Integrated Circuits (IC)",
                "Scale: SSI (Small Scale Integration) & MSI (Medium Scale Integration)",
                "Programming: High-Level Languages developed",
                "Power: Drastically lower power consumption",
                "Performance: Higher speed, compatibility, and reliability",
                "Example System: IBM 360 Series"
            ]
        },
        4: {
            title: "Fourth Generation Computers",
            tech: "Micro-electronics (LSI & VLSI)",
            description: "Powered by microprocessors integrating thousands to millions of components on a micro-electronic chip.",
            features: [
                "Primary Tech: LSI (Large Scale Integration) & VLSI (Very Large Scale)",
                "Form Factor: Development of Portable & Personal Computers",
                "Storage Tech: RAID technology for data storage",
                "Applications: Virtual Reality, multimedia, computer simulations",
                "Networking: Widespread adoption for Data Communication"
            ]
        },
        5: {
            title: "Fifth Generation Computers (Modern & Beyond)",
            tech: "Superconductors & AI Microprocessors",
            description: "Current state-of-the-art architectures designed around parallel processing, artificial intelligence, and natural interaction.",
            features: [
                "Primary Tech: Superconductors & Parallel Processing",
                "Artificial Intelligence: AI & Machine Learning integration",
                "Voice Interaction: Advanced speech recognition",
                "Robotics: Intelligent robotic automation & decision systems",
                "High Speed Memory: Ultra-high speed access memory & storage"
            ]
        }
    };

    function renderGeneration(genNum) {
        const data = generationsData[genNum];
        if (!data || !genDisplayCard) return;

        genDisplayCard.innerHTML = `
            <div class="gen-display-header">
                <h3>${data.title}</h3>
                <span class="gen-tech-tag">${data.tech}</span>
            </div>
            <p style="color: #e2e8f0; font-size: 1.25rem; margin-bottom: 1.8rem; font-weight: 500;">${data.description}</p>
            <div class="gen-features-list">
                ${data.features.map(f => `<div class="gen-feature-item">${f}</div>`).join('')}
            </div>
        `;
    }

    genTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            genTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderGeneration(tab.dataset.gen);
        });
    });

    // Initial render for 1st Gen
    renderGeneration(1);

    // --------------------------------------------------------------------------
    // 4. Interactive Logic Gates Simulator
    // --------------------------------------------------------------------------
    const gateBtns = document.querySelectorAll('.gate-btn');
    const activeGateName = document.getElementById('active-gate-name');
    const activeGateFormula = document.getElementById('active-gate-formula');
    const toggleA = document.getElementById('toggle-a');
    const toggleB = document.getElementById('toggle-b');
    const controlB = document.getElementById('control-b');
    const wireA = document.getElementById('wire-a-el');
    const wireB = document.getElementById('wire-b-el');
    const wireOut = document.getElementById('wire-out-el');
    const outputBulb = document.getElementById('output-bulb');
    const outputBulbVal = document.getElementById('output-bulb-val');
    const gateSvgContainer = document.getElementById('gate-svg-container');
    const gateDescText = document.getElementById('gate-desc-text');
    const truthTableContainer = document.getElementById('truth-table-container');

    let currentGate = 'AND';
    let inputA = 0;
    let inputB = 0;

    const gateDefinitions = {
        AND: {
            name: "AND Gate",
            formula: "Y = A • B",
            desc: "The AND gate gives a high output (1) ONLY if all its inputs are high.",
            eval: (a, b) => a & b,
            inputs: 2,
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><path d="M10 10 H40 A20 20 0 0 1 40 50 H10 Z" fill="none" stroke="#00e5ff" stroke-width="4"/></svg>`
        },
        OR: {
            name: "OR Gate",
            formula: "Y = A + B",
            desc: "The OR gate gives a high output (1) if ONE OR MORE of its inputs are high.",
            eval: (a, b) => a | b,
            inputs: 2,
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><path d="M10 10 Q35 30 10 50 Q50 50 65 30 Q50 10 10 10 Z" fill="none" stroke="#00e5ff" stroke-width="4"/></svg>`
        },
        NOT: {
            name: "NOT Gate (Inverter)",
            formula: "Y = A'  (Ā)",
            desc: "The NOT gate produces an inverted version of the input at its output.",
            eval: (a) => a === 1 ? 0 : 1,
            inputs: 1,
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><polygon points="15,10 60,30 15,50" fill="none" stroke="#00e5ff" stroke-width="4"/><circle cx="66" cy="30" r="5" fill="none" stroke="#00e5ff" stroke-width="4"/></svg>`
        },
        NAND: {
            name: "NAND Gate (NOT-AND)",
            formula: "Y = (A • B)'",
            desc: "A NOT-AND gate. The output is high (1) if ANY of the inputs are low.",
            eval: (a, b) => (a & b) === 1 ? 0 : 1,
            inputs: 2,
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><path d="M10 10 H35 A20 20 0 0 1 35 50 H10 Z" fill="none" stroke="#00e5ff" stroke-width="4"/><circle cx="60" cy="30" r="5" fill="none" stroke="#00e5ff" stroke-width="4"/></svg>`
        },
        NOR: {
            name: "NOR Gate (NOT-OR)",
            formula: "Y = (A + B)'",
            desc: "A NOT-OR gate. The outputs are low (0) if ANY of the inputs are high.",
            eval: (a, b) => (a | b) === 1 ? 0 : 1,
            inputs: 2,
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><path d="M10 10 Q35 30 10 50 Q50 50 65 30 Q50 10 10 10 Z" fill="none" stroke="#00e5ff" stroke-width="4"/><circle cx="72" cy="30" r="5" fill="none" stroke="#00e5ff" stroke-width="4"/></svg>`
        },
        EXOR: {
            name: "EXOR (Exclusive-OR) Gate",
            formula: "Y = A ⊕ B",
            desc: "The Exclusive-OR gate gives a high output (1) if EITHER, but NOT BOTH, inputs are high.",
            eval: (a, b) => a ^ b,
            inputs: 2,
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><path d="M5 10 Q30 30 5 50" fill="none" stroke="#00e5ff" stroke-width="3"/><path d="M15 10 Q40 30 15 50 Q55 50 70 30 Q55 10 15 10 Z" fill="none" stroke="#00e5ff" stroke-width="4"/></svg>`
        },
        EXNOR: {
            name: "EXNOR (Exclusive-NOR) Gate",
            formula: "Y = (A ⊕ B)'",
            desc: "Does the opposite of EXOR. Gives a low output (0) if either, but not both, inputs are high.",
            eval: (a, b) => (a ^ b) === 1 ? 0 : 1,
            inputs: 2,
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><path d="M5 10 Q30 30 5 50" fill="none" stroke="#00e5ff" stroke-width="3"/><path d="M15 10 Q40 30 15 50 Q55 50 70 30 Q55 10 15 10 Z" fill="none" stroke="#00e5ff" stroke-width="4"/><circle cx="76" cy="30" r="5" fill="none" stroke="#00e5ff" stroke-width="4"/></svg>`
        }
    };

    function updateSimulator() {
        const gate = gateDefinitions[currentGate];
        if (!gate) return;

        // UI text
        if (activeGateName) activeGateName.textContent = gate.name;
        if (activeGateFormula) activeGateFormula.textContent = gate.formula;
        if (gateDescText) gateDescText.textContent = gate.desc;
        if (gateSvgContainer) gateSvgContainer.innerHTML = gate.svg;

        // Show/hide Input B for NOT gate
        if (controlB) {
            controlB.style.display = (gate.inputs === 1) ? 'none' : 'flex';
        }
        if (wireB) {
            wireB.style.display = (gate.inputs === 1) ? 'none' : 'block';
        }

        // Evaluate Output
        const output = gate.eval(inputA, inputB);

        // Update Wires & Bulb
        wireA.classList.toggle('active', inputA === 1);
        wireA.querySelector('.signal-val').textContent = `A=${inputA}`;

        if (gate.inputs === 2) {
            wireB.classList.toggle('active', inputB === 1);
            wireB.querySelector('.signal-val').textContent = `B=${inputB}`;
        }

        wireOut.classList.toggle('active', output === 1);
        outputBulb.classList.toggle('active', output === 1);
        if (outputBulbVal) outputBulbVal.textContent = output;

        // Render Truth Table
        renderTruthTable(gate);
    }

    function renderTruthTable(gate) {
        if (!truthTableContainer) return;

        if (gate.inputs === 1) {
            // NOT Gate (2 rows)
            const rows = [
                { a: 0, out: gate.eval(0, 0) },
                { a: 1, out: gate.eval(1, 0) }
            ];

            truthTableContainer.innerHTML = `
                <table class="truth-table">
                    <thead>
                        <tr>
                            <th>Input A</th>
                            <th>Output Y</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(r => `
                            <tr class="${r.a === inputA ? 'active-row' : ''}">
                                <td>${r.a}</td>
                                <td>${r.out}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            // 2-Input Gates (4 rows)
            const rows = [
                { a: 0, b: 0, out: gate.eval(0, 0) },
                { a: 0, b: 1, out: gate.eval(0, 1) },
                { a: 1, b: 0, out: gate.eval(1, 0) },
                { a: 1, b: 1, out: gate.eval(1, 1) }
            ];

            truthTableContainer.innerHTML = `
                <table class="truth-table">
                    <thead>
                        <tr>
                            <th>Input A</th>
                            <th>Input B</th>
                            <th>Output Y</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(r => `
                            <tr class="${(r.a === inputA && r.b === inputB) ? 'active-row' : ''}">
                                <td>${r.a}</td>
                                <td>${r.b}</td>
                                <td>${r.out}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    }

    // Gate Selector Listeners
    gateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gateBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGate = btn.dataset.gate;
            updateSimulator();
        });
    });

    // Switch Listeners
    if (toggleA) {
        toggleA.addEventListener('click', () => {
            inputA = inputA === 0 ? 1 : 0;
            toggleA.textContent = inputA;
            toggleA.className = `toggle-btn val-${inputA}`;
            updateSimulator();
        });
    }

    if (toggleB) {
        toggleB.addEventListener('click', () => {
            inputB = inputB === 0 ? 1 : 0;
            toggleB.textContent = inputB;
            toggleB.className = `toggle-btn val-${inputB}`;
            updateSimulator();
        });
    }

    // Initial Simulator Setup
    updateSimulator();

});
