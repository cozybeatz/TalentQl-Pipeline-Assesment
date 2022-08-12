const table = document.getElementById('table');
const tableBody = table?.getElementsByTagName('tbody')[0]!;
const pageLabel = document.getElementById('pageLabel')!;
const prevBtn = <HTMLInputElement> document.getElementById('prevBtn')!;
const nextBtn = document.getElementById('nextBtn')!;

const startApp = async () => {

    const checkIfIseven = (num: number) => {  
        // get modulo
        let mod = num % 2;
        // check if modulo is zero
        if(mod = 0){
            return true;
        }
        return false;
    }

    const fetchData = async (pageNumber: number = 1) => {
        let res : any;
        // check if query number is even
        let isPageNumberEven = checkIfIseven(pageNumber);
        // Check if query number is even
        if(isPageNumberEven = true) {
            // get query number 
            let queryParamNumber = pageNumber - 1;
            // fetch results
            res = await fetch(`https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${queryParamNumber}`); 
        } else {
            res = await fetch(`https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${pageNumber}`); 
        } 
        // PARSE DATA AS JSON
        const data  = await res.json();
        // GET RESULTS FROM DATA
        const { results } = data;
        // GET CORRESPONDING PAGE RESULTS
        let pageResults: any
        return pageResults = results[0][pageNumber];
    }

    
    const fetchAndInsertPageData = async (pageNumber: number = 1) => {
        // Get page results
        let pageResults = await fetchData(pageNumber);
        // Loop through page results 
        for(const response in pageResults) {
            // Get current iteration of page results
            const data = pageResults[response];
            // Insert new row into table 
            let newRow = tableBody?.insertRow(parseInt(response))!;
            // Insert cell for row
            let rowCell = newRow?.insertCell(0);
            // Insert cell for gender 
            let genderCell = newRow?.insertCell(1);
            // Insert cell for age
            let ageCell = newRow?.insertCell(2);
            // Set row dataset for entry id
            newRow.dataset.entryid = data?.id;
            // Get row info from current iteration of page results
            let row = data?.row
            // set row text 
            let rowText = document.createTextNode(row);
            // Get gender info from current iteration of page results
            let gender = data?.gender;
            // set gender text
            let gendertext = document.createTextNode(gender);
            // Get age info from current iteration of page results
            let age = data?.age;
            // set age text
            let ageText = document.createTextNode(age)
            
            // append rowtext to row cell
            rowCell?.append(rowText)
            // append genderText to gender cell
            genderCell?.append(gendertext);
            // append ageText to age cell
            ageCell?.append(ageText)
        }
    }

    const setNavData = (page: number) => {
        // set prev btn dataset as page number - 1
        prevBtn.dataset.prevbtn = `${page - 1}`;
        // set next btn dataset as page number + 2
        nextBtn.dataset.nextbtn = `${page + 1}`;
        // set page label dataset as page number
        pageLabel.dataset.pageview = `${page}`;
        // set page label innerhtml
        pageLabel.innerHTML = `Showing Page ${page}`;
    }

    const getPageNumberFromBtnDataset = (btn: any, dataset: string) => {
        // get pageNumber from button dataset
        let pageNumber: any = btn.getAttribute(dataset);
        // parse page number from string to number
        pageNumber = parseInt(pageNumber);
        // return number
        return pageNumber;
    }

    const checkForPrevPageEnd = () => {
        // Get number from button dataset
        let pageNumber = getPageNumberFromBtnDataset(prevBtn, 'data-prevbtn')
        // check if pagenumber is 0
        if(pageNumber === 0) {
            // disable if true
            prevBtn.disabled = true;
            return;
        } else {
            // do not disable if false
            prevBtn.disabled = false; 
        }
    }

    // Reset Table Body Inner HTML
    tableBody.innerHTML = '';
    // Fetch Data And Insert Into Table
    await fetchAndInsertPageData();
    // Set Navigation Items Data
    setNavData(1);
    // Check If Page is 1 And Disable Previous Button
    checkForPrevPageEnd();


    // ON NEXT BUTTON CLICK
    nextBtn.onclick = async (e) => {
        // prevent default behavior
        e.preventDefault()
        // Reset Table Body Inner HTML
        tableBody.innerHTML = '';
        // Get Next Page Number
        let pageNumber = getPageNumberFromBtnDataset(nextBtn, 'data-nextbtn')
        // Fetch And Insert Page Data
        await fetchAndInsertPageData(pageNumber);
        // Set navigation data
        setNavData(pageNumber);
        // Check if page is 1 and disable prev button
        checkForPrevPageEnd();
    }

    // ON PREVIOUS BUTTON CLICK
    prevBtn.onclick = async (e) => {
        // prevent default behavior
        e.preventDefault()
        // Reset Table Body Inner HTML
        tableBody.innerHTML = '';
        // Get Next Page Number
        let pageNumber = getPageNumberFromBtnDataset(prevBtn, 'data-prevbtn')
        // Fetch And Insert Page Data
        await fetchAndInsertPageData(pageNumber);
        // Set navigation data
        setNavData(pageNumber);
        // Check if page is 1 and disable prev button
        checkForPrevPageEnd();
    }


};
document.addEventListener('DOMContentLoaded', startApp);