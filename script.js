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