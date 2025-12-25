const ramos = [
    // SEMESTRE 1
    { id: 1, nombre: "Seguridad en la industria", semestre: 1, req: [] },
    { id: 2, nombre: "Sistemas de Instrumentación Industrial", semestre: 1, req: [] },
    { id: 3, nombre: "Electrónica Analógica", semestre: 1, req: [] },
    { id: 4, nombre: "Máquinas Eléctricas", semestre: 1, req: [] },
    { id: 5, nombre: "Iniciativa y Gestión Personal y Social", semestre: 1, req: [] },
    
    // SEMESTRE 2
    { id: 6, nombre: "Programación de PLC Básica", semestre: 2, req: [] },
    { id: 7, nombre: "Electrónica Digital", semestre: 2, req: [] },
    { id: 8, nombre: "Redes Industriales y Comunicaciones", semestre: 2, req: [] },
    { id: 9, nombre: "Sistemas de Control Industrial", semestre: 2, req: [] },
    { id: 10, nombre: "Mantenimiento y Equipos Industriales", semestre: 2, req: [] },
    { id: 11, nombre: "Normas y Planos Industriales", semestre: 2, req: [] },
    { id: 12, nombre: "Comunicación Profesional Efectiva", semestre: 2, req: [] },

    // SEMESTRE 3
    { id: 13, nombre: "Sistemas Electrohidráulicos y Electroneumáticos", semestre: 3, req: [] },
    { id: 14, nombre: "Instrumentación de Campo", semestre: 3, req: [] },
    { id: 15, nombre: "Conectividad y Mantención de Redes Industriales", semestre: 3, req: [] },
    { id: 16, nombre: "Seguridad de Redes Industriales", semestre: 3, req: [] },
    { id: 17, nombre: "Programación del Mantenimiento", semestre: 3, req: [] },
    { id: 18, nombre: "Integración de Competencias I", semestre: 3, req: [] },
    { id: 19, nombre: "Innovación Social", semestre: 3, req: [] },
    { id: 20, nombre: "Orientación al Empleo y Emprendimiento", semestre: 3, req: [] },

    // SEMESTRE 4
    { id: 21, nombre: "Programación de PLC Avanzada", semestre: 4, req: [] },
    { id: 22, nombre: "Instrumentación Digital", semestre: 4, req: [] },
    { id: 23, nombre: "Internet de las Cosas", semestre: 4, req: [] },
    { id: 24, nombre: "Gestión de Recursos de Mantenimiento", semestre: 4, req: [] },
    { id: 25, nombre: "Integración de Competencias II", semestre: 4, req: [18] }, // REQUISITO
    { id: 26, nombre: "Ética Profesional", semestre: 4, req: [] },
    { id: 27, nombre: "Proyectos Colaborativos de Innovación Regional", semestre: 4, req: [] },

    // SEMESTRE 5
    { id: 28, nombre: "Sistemas de Automatización y Control Industrial", semestre: 5, req: [] },
    { id: 29, nombre: "Sistemas Digitales y Robóticos", semestre: 5, req: [] },
    { id: 30, nombre: "Programación para Sistemas Inteligentes", semestre: 5, req: [] },
    { id: 31, nombre: "Análisis de Falla en Sistemas Automatizados", semestre: 5, req: [] },
    { id: 32, nombre: "Cálculo I", semestre: 5, req: [] },
    { id: 33, nombre: "Cultura y Valores", semestre: 5, req: [] },

    // SEMESTRE 6
    { id: 34, nombre: "Diseño de Sistemas de Control Industrial", semestre: 6, req: [] },
    { id: 35, nombre: "Mecatrónica", semestre: 6, req: [] },
    { id: 36, nombre: "Automatización de Infraestructura en Redes Industriales", semestre: 6, req: [] },
    { id: 37, nombre: "Modelado y Simulación de Procesos Industriales", semestre: 6, req: [] },
    { id: 38, nombre: "Ingeniería de Confiabilidad", semestre: 6, req: [] },
    { id: 39, nombre: "Evaluación de Proyectos", semestre: 6, req: [] },
    { id: 40, nombre: "Creatividad en la Innovación y Emprendimiento", semestre: 6, req: [] },

    // SEMESTRE 7
    { id: 41, nombre: "Ingeniería de Control Industrial", semestre: 7, req: [] },
    { id: 42, nombre: "Inteligencia Artificial en Sistemas Automatizados", semestre: 7, req: [] },
    { id: 43, nombre: "Bigdata para la Industria", semestre: 7, req: [] },
    { id: 44, nombre: "Programación Orientada a Sistemas Inteligentes", semestre: 7, req: [] },
    { id: 45, nombre: "Proyectos de Ingeniería", semestre: 7, req: [] },
    { id: 46, nombre: "Integración de Competencias III", semestre: 7, req: [25] }, // REQUISITO
    { id: 47, nombre: "Proyectos Colaborativos Avanzados de Innovación Regional", semestre: 7, req: [] },

    // SEMESTRE 8
    { id: 48, nombre: "Práctica Profesional", semestre: 8, req: [] },
    { id: 49, nombre: "Actividad de Titulación", semestre: 8, req: [] }
];

let aprobados = JSON.parse(localStorage.getItem('malla_progreso')) || [];

function initMalla() {
    const grid = document.getElementById('malla-grid');
    grid.innerHTML = '';

    for (let i = 1; i <= 8; i++) {
        const semestreCol = document.createElement('div');
        semestreCol.className = 'semestre-col';
        semestreCol.innerHTML = `<div class="semestre-title">Semestre ${i}</div>`;

        const ramosSemestre = ramos.filter(r => r.semestre === i);
        ramosSemestre.forEach(ramo => {
            const card = document.createElement('div');
            card.id = `ramo-${ramo.id}`;
            card.className = 'ramo-card';
            card.innerText = ramo.nombre;
            
            // Actualizar estado visual
            updateCardState(card, ramo);

            card.onclick = () => toggleRamo(ramo);
            semestreCol.appendChild(card);
        });

        grid.appendChild(semestreCol);
    }
    updateProgress();
}

function updateCardState(element, ramo) {
    const isAprobado = aprobados.includes(ramo.id);
    const faltantes = checkPrerrequisitos(ramo);
    
    element.classList.remove('aprobado', 'bloqueado');
    
    if (isAprobado) {
        element.classList.add('aprobado');
    } else if (faltantes.length > 0) {
        element.classList.add('bloqueado');
    }
}

function checkPrerrequisitos(ramo) {
    // Retorna una lista de nombres de ramos que faltan por aprobar
    return ramo.req.filter(reqId => !aprobados.includes(reqId))
                   .map(reqId => ramos.find(r => r.id === reqId).nombre);
}

function toggleRamo(ramo) {
    const index = aprobados.indexOf(ramo.id);
    
    if (index > -1) {
        // Si ya está aprobado, lo quitamos (desmarcar)
        // Ojo: Podrías añadir lógica para desmarcar también los que dependen de este.
        aprobados.splice(index, 1);
    } else {
        // Intentar marcar como aprobado
        const faltantes = checkPrerrequisitos(ramo);
        if (faltantes.length > 0) {
            alert(`⚠️ Bloqueado: Para aprobar este ramo debes aprobar primero:\n- ${faltantes.join('\n- ')}`);
            return;
        }
        aprobados.push(ramo.id);
    }

    saveAndRefresh();
}

function saveAndRefresh() {
    localStorage.setItem('malla_progreso', JSON.stringify(aprobados));
    initMalla();
}

function updateProgress() {
    const percent = Math.round((aprobados.length / ramos.length) * 100);
    document.getElementById('progress-fill').style.width = percent + '%';
    document.getElementById('progress-text').innerText = percent + '%';
}

document.getElementById('reset-btn').onclick = () => {
    if(confirm("¿Estás seguro de que quieres borrar todo tu progreso?")) {
        aprobados = [];
        saveAndRefresh();
    }
};

// Iniciar aplicación
initMalla();
