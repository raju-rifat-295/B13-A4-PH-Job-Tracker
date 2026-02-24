let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

const totalCount = document.getElementById('total-count');
const interviewCount = document.getElementById('interview-count');
const rejectedCount = document.getElementById('rejected-count');
const sectionCount = document.getElementById('section-count');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('all-cards-section');
const filterSection = document.getElementById('filtered-section');
const mainContainer = document.querySelector('main');

function calculateCount() {
    totalCount.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (currentStatus === 'all-filter-btn') {
        sectionCount.innerText = allCardSection.children.length;
    } else if (currentStatus === 'interview-filter-btn') {
        sectionCount.innerText = interviewList.length;
    } else if (currentStatus === 'rejected-filter-btn') {
        sectionCount.innerText = rejectedList.length;
    }
}

calculateCount();

function toggleStyle(id) {
    const buttons = [allFilterBtn, interviewFilterBtn, rejectedFilterBtn];
    buttons.forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-white', 'text-slate-600');
    });

    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-slate-600');
    selected.classList.add('bg-blue-600', 'text-white');

    currentStatus = id;

    if (id === 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
        sectionCount.innerText = allCardSection.children.length;
    } else if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
        sectionCount.innerText = interviewList.length;
    } else if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
        sectionCount.innerText = rejectedList.length;
    }
}

mainContainer.addEventListener('click', function (event) {
    const target = event.target;
    const card = target.closest('.job-card'); 

    if (!card) return; 

    if (target.classList.contains('btn-interview')) {
        const company = card.querySelector('.company').innerText;
        const position = card.querySelector('.position').innerText;
        const location = card.querySelector('.location').innerText;
        const type = card.querySelector('.type').innerText;
        const salary = card.querySelector('.salary').innerText;
        const description = card.querySelector('.description').innerText;

        const badge = card.querySelector('.status-badge');
        badge.innerText = 'Interview';
        badge.className = 'status-badge bg-emerald-100 text-emerald-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider';

        const cardInfo = {
            company, position, location, type, salary, description, status: 'Interview'
        };

        const exists = interviewList.find(item => item.company === cardInfo.company);
        if (!exists) {
            interviewList.push(cardInfo);
        }

        rejectedList = rejectedList.filter(item => item.company !== cardInfo.company);

        if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
            sectionCount.innerText = rejectedList.length;
        }
        calculateCount();
    }

    else if (target.classList.contains('btn-rejected')) {
        const company = card.querySelector('.company').innerText;
        const position = card.querySelector('.position').innerText;
        const location = card.querySelector('.location').innerText;
        const type = card.querySelector('.type').innerText;
        const salary = card.querySelector('.salary').innerText;
        const description = card.querySelector('.description').innerText;

        const badge = card.querySelector('.status-badge');
        badge.innerText = 'Rejected';
        badge.className = 'status-badge bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider';

        const cardInfo = {
            company, position, location, type, salary, description, status: 'Rejected'
        };

        const exists = rejectedList.find(item => item.company === cardInfo.company);
        if (!exists) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.company !== cardInfo.company);

        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
            sectionCount.innerText = interviewList.length;
        }
        calculateCount();
    }

    else if (target.closest('.btn-delete')) {
        const companyName = card.querySelector('.company').innerText;
        
        card.remove();

        interviewList = interviewList.filter(item => item.company !== companyName);
        rejectedList = rejectedList.filter(item => item.company !== companyName);

        if (currentStatus === 'interview-filter-btn') renderInterview();
        if (currentStatus === 'rejected-filter-btn') renderRejected();

        calculateCount();
    }
});


function renderInterview() {
    filterSection.innerHTML = '';

    if (interviewList.length === 0) {
        filterSection.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20">
                <div class="bg-blue-100 p-6 rounded-full mb-6">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-10 text-blue-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">No jobs available</h3>
                <p class="text-slate-500">Check back soon for new job opportunities</p>
            </div>
        `;
        return;
    }

    for (let job of interviewList) {
        let div = document.createElement('div');
        div.className = 'job-card bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative group transition-all hover:shadow-md';
        div.innerHTML = `
            <button class="btn-delete absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 pointer-events-none"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
            </button>
            <div class="mb-4">
                <h3 class="company text-xl font-bold text-slate-900">${job.company}</h3>
                <p class="position text-slate-500 font-medium">${job.position}</p>
            </div>
            <div class="flex flex-wrap gap-3 text-sm text-slate-500 mb-4">
                <span class="location">${job.location}</span> • <span class="type">${job.type}</span> • <span class="salary">${job.salary}</span>
            </div>
            <div class="mb-6"><span class="status-badge bg-emerald-100 text-emerald-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">${job.status}</span></div>
            <p class="description text-slate-600 mb-6 text-sm leading-relaxed">${job.description}</p>
            <div class="flex gap-3">
                <button class="btn-interview border border-emerald-500 text-emerald-500 hover:bg-emerald-50 px-4 py-2 rounded text-sm font-bold uppercase transition-colors">Interview</button>
                <button class="btn-rejected border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded text-sm font-bold uppercase transition-colors">Rejected</button>
            </div>
        `;
        filterSection.appendChild(div);
    }
}