/* ==========================================================================
   IT21-PT1 Module 1 Presentation Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Enable Spotlight Mode by default
    document.body.classList.add('spotlight-active');

    // --------------------------------------------------------------------------
    // 1. Stage Navigation & Header Controls
    // --------------------------------------------------------------------------
    const slides = document.querySelectorAll('.section-block');
    const navBtns = document.querySelectorAll('.nav-btn');
    const btnPrev = document.getElementById('btn-prev-slide');
    const btnNext = document.getElementById('btn-next-slide');
    const currentSlideNumEl = document.getElementById('current-slide-num');
    const totalSlidesNumEl = document.getElementById('total-slides-num');
    const progressBar = document.getElementById('progress-bar');
    const fullscreenToggleBtn = document.getElementById('fullscreen-toggle');
    const spotlightToggleBtn = document.getElementById('spotlight-toggle-btn');

    let currentSlideIndex = 0;
    const totalSlides = slides.length;

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
    }

    navBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => goToSlide(idx));
    });

    if (btnPrev) btnPrev.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
    if (btnNext) btnNext.addEventListener('click', () => goToSlide(currentSlideIndex + 1));

    document.addEventListener('keydown', (e) => {
        // Prevent navigation when modal is open
        if (document.getElementById('detail-modal').classList.contains('active')) return;

        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
            goToSlide(currentSlideIndex + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            goToSlide(currentSlideIndex - 1);
        }
    });

    // Fullscreen Toggle
    if (fullscreenToggleBtn) {
        fullscreenToggleBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`Error: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
            }
        });
    }

    // Spotlight Focus Toggle
    if (spotlightToggleBtn) {
        spotlightToggleBtn.addEventListener('click', () => {
            const isActive = document.body.classList.toggle('spotlight-active');
            spotlightToggleBtn.classList.toggle('active', isActive);
            spotlightToggleBtn.querySelector('span:last-child').textContent = isActive ? 'Spotlight Focus: ON' : 'Spotlight Focus: OFF';
        });
    }

    // --------------------------------------------------------------------------
    // 2. Stage 1 Objective Modals
    // --------------------------------------------------------------------------
    const modal = document.getElementById('detail-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTag = document.getElementById('modal-tag');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const detailTriggers = document.querySelectorAll('.btn-detail-trigger');

    const objectiveDetailsData = {
        obj1: {
            tag: "OBJECTIVE 1 • TERMINOLOGIES",
            title: "Distinguish Computer Architecture vs Organization",
            content: `
                <p style="margin-bottom: 1rem;">Computer system design requires differentiating between conceptual specification and hardware implementation:</p>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.8rem;">
                    <li>🔹 <strong>Computer Architecture:</strong> The operational design and instruction set visible to programmers (e.g. 80x86 architecture).</li>
                    <li>🔹 <strong>Computer Organization:</strong> Operational units and their interconnections that realize architectural specifications (e.g. CPU, memory buses, peripheral controllers).</li>
                </ul>
            `
        },
        obj2: {
            tag: "OBJECTIVE 2 • STRUCTURE & FUNCTION",
            title: "Analyze Core Functions & Von Neumann Model",
            content: `
                <p style="margin-bottom: 1rem;">John Von Neumann pioneered the basic operational design for modern computer systems (Von Neumann Architecture / VNA):</p>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.8rem;">
                    <li>🧠 <strong>Central Processing Unit (CPU):</strong> Contains Control Unit (CU) & Arithmetic Logic Unit (ALU).</li>
                    <li>💾 <strong>Central Memory (RAM):</strong> Volatile semiconductor cells holding active program instructions and data.</li>
                    <li>🔌 <strong>I/O & Auxiliary Storage:</strong> Communication interfaces and file-based magnetic storage registers.</li>
                </ul>
            `
        },
        obj3: {
            tag: "OBJECTIVE 3 • LOGIC GATES",
            title: "Evaluate Digital Logic Gate Circuits",
            content: `
                <p style="margin-bottom: 1rem;">Digital computer systems are constructed using foundational logic gates:</p>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.8rem;">
                    <li>⚡ <strong>Basic Gates:</strong> AND (A • B), OR (A + B), NOT (A').</li>
                    <li>⚡ <strong>Derived Gates:</strong> NAND ((A • B)'), NOR ((A + B)'), EXOR (A ⊕ B), EXNOR ((A ⊕ B)').</li>
                    <li>🛠️ <strong>Universal Gates:</strong> NAND & NOR can synthesize ANY boolean logic expression (SOP & POS).</li>
                </ul>
            `
        }
    };

    detailTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.detail;
            const data = objectiveDetailsData[key];
            if (data && modal) {
                modalTag.textContent = data.tag;
                modalTitle.textContent = data.title;
                modalBody.innerHTML = data.content;
                modal.classList.add('active');
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    // --------------------------------------------------------------------------
    // 3. Stage 2 Von Neumann Architecture Lab Inspector & Simulation
    // --------------------------------------------------------------------------
    const archNodes = document.querySelectorAll('.arch-node');
    const drawerBadge = document.getElementById('drawer-badge');
    const drawerTitle = document.getElementById('drawer-title');
    const drawerDesc = document.getElementById('drawer-desc');
    const btnSimulateBus = document.getElementById('btn-simulate-bus');

    const componentDetails = {
        cpu: {
            badge: "CPU SELECTED • CENTRAL PROCESSING UNIT",
            title: "Central Processor (CPU)",
            desc: "The core engine composed of the Control Unit (CU) and the Arithmetic and Logic Unit (ALU). Functions include reading & writing memory cell contents, decoding program instructions, and executing calculations."
        },
        memory: {
            badge: "CENTRAL MEMORY SELECTED • RAM",
            title: "Central Memory (Random Access Memory - RAM)",
            desc: "A group of semiconductor cells used for general program execution and temporary data storage. RAM is volatile — information is lost when electrical power is interrupted."
        },
        io: {
            badge: "I/O & AUXILIARY STORAGE SELECTED",
            title: "Input/Output Units & Auxiliary Media",
            desc: "Interfaces that allow the processor to communicate with external peripherals. Auxiliary storage (magnetic media) holds files consisting of variable numbers of fixed-size registers."
        }
    };

    archNodes.forEach(node => {
        node.addEventListener('click', () => {
            archNodes.forEach(n => n.classList.remove('active-node'));
            node.classList.add('active-node');

            const compKey = node.dataset.component;
            if (componentDetails[compKey]) {
                drawerBadge.textContent = componentDetails[compKey].badge;
                drawerTitle.textContent = componentDetails[compKey].title;
                drawerDesc.textContent = componentDetails[compKey].desc;
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
    // 4. Stage 3 Interactive Logic Gates Simulator
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
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><path d="M10 10 H40 A20 20 0 0 1 40 50 H10 Z" fill="none" stroke="#2563eb" stroke-width="4"/></svg>`
        },
        OR: {
            name: "OR Gate",
            formula: "Y = A + B",
            desc: "The OR gate gives a high output (1) if ONE OR MORE of its inputs are high.",
            eval: (a, b) => a | b,
            inputs: 2,
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><path d="M10 10 Q35 30 10 50 Q50 50 65 30 Q50 10 10 10 Z" fill="none" stroke="#2563eb" stroke-width="4"/></svg>`
        },
        NOT: {
            name: "NOT Gate (Inverter)",
            formula: "Y = A'  (Ā)",
            desc: "The NOT gate produces an inverted version of the input at its output.",
            eval: (a) => a === 1 ? 0 : 1,
            inputs: 1,
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><polygon points="15,10 60,30 15,50" fill="none" stroke="#2563eb" stroke-width="4"/><circle cx="66" cy="30" r="5" fill="none" stroke="#2563eb" stroke-width="4"/></svg>`
        },
        NAND: {
            name: "NAND Gate (NOT-AND)",
            formula: "Y = (A • B)'",
            desc: "A NOT-AND gate. The output is high (1) if ANY of the inputs are low.",
            eval: (a, b) => (a & b) === 1 ? 0 : 1,
            inputs: 2,
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><path d="M10 10 H35 A20 20 0 0 1 35 50 H10 Z" fill="none" stroke="#2563eb" stroke-width="4"/><circle cx="60" cy="30" r="5" fill="none" stroke="#2563eb" stroke-width="4"/></svg>`
        },
        NOR: {
            name: "NOR Gate (NOT-OR)",
            formula: "Y = (A + B)'",
            desc: "A NOT-OR gate. The outputs are low (0) if ANY of the inputs are high.",
            eval: (a, b) => (a | b) === 1 ? 0 : 1,
            inputs: 2,
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><path d="M10 10 Q35 30 10 50 Q50 50 65 30 Q50 10 10 10 Z" fill="none" stroke="#2563eb" stroke-width="4"/><circle cx="72" cy="30" r="5" fill="none" stroke="#2563eb" stroke-width="4"/></svg>`
        },
        EXOR: {
            name: "EXOR (Exclusive-OR) Gate",
            formula: "Y = A ⊕ B",
            desc: "The Exclusive-OR gate gives a high output (1) if EITHER, but NOT BOTH, inputs are high.",
            eval: (a, b) => a ^ b,
            inputs: 2,
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><path d="M5 10 Q30 30 5 50" fill="none" stroke="#2563eb" stroke-width="3"/><path d="M15 10 Q40 30 15 50 Q55 50 70 30 Q55 10 15 10 Z" fill="none" stroke="#2563eb" stroke-width="4"/></svg>`
        },
        EXNOR: {
            name: "EXNOR (Exclusive-NOR) Gate",
            formula: "Y = (A ⊕ B)'",
            desc: "Does the opposite of EXOR. Gives a low output (0) if either, but not both, inputs are high.",
            eval: (a, b) => (a ^ b) === 1 ? 0 : 1,
            inputs: 2,
            svg: `<svg width="120" height="70" viewBox="0 0 100 60"><path d="M5 10 Q30 30 5 50" fill="none" stroke="#2563eb" stroke-width="3"/><path d="M15 10 Q40 30 15 50 Q55 50 70 30 Q55 10 15 10 Z" fill="none" stroke="#2563eb" stroke-width="4"/><circle cx="76" cy="30" r="5" fill="none" stroke="#2563eb" stroke-width="4"/></svg>`
        }
    };

    function updateSimulator() {
        const gate = gateDefinitions[currentGate];
        if (!gate) return;

        if (activeGateName) activeGateName.textContent = gate.name;
        if (activeGateFormula) activeGateFormula.textContent = gate.formula;
        if (gateDescText) gateDescText.textContent = gate.desc;
        if (gateSvgContainer) gateSvgContainer.innerHTML = gate.svg;

        if (controlB) controlB.style.display = (gate.inputs === 1) ? 'none' : 'flex';
        if (wireB) wireB.style.display = (gate.inputs === 1) ? 'none' : 'block';

        const output = gate.eval(inputA, inputB);

        wireA.classList.toggle('active', inputA === 1);
        wireA.querySelector('.signal-val').textContent = `A=${inputA}`;

        if (gate.inputs === 2) {
            wireB.classList.toggle('active', inputB === 1);
            wireB.querySelector('.signal-val').textContent = `B=${inputB}`;
        }

        wireOut.classList.toggle('active', output === 1);
        outputBulb.classList.toggle('active', output === 1);
        if (outputBulbVal) outputBulbVal.textContent = output;

        renderTruthTable(gate);
    }

    function renderTruthTable(gate) {
        if (!truthTableContainer) return;

        if (gate.inputs === 1) {
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
            const rows = [
                { a: 0, b: 0, out: gate.eval(0, 0) },
                { a: 0, b: 1, out: gate.eval(0, 1) },
                { a: 1, b: 0, out: gate.eval(1, 0) },
                { a: 1, b: 1, out: gate.eval(1, 1) },
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

    gateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gateBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGate = btn.dataset.gate;
            updateSimulator();
        });
    });

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

    updateSimulator();

});
