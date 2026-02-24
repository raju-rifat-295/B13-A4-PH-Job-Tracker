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