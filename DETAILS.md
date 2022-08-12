# Implementation Details

## How does this work

1. I have all my selectors for the table, table body, page label, preious btn and next btn.

2. I declare a `checkIfIsEven` function that checks if a particular page number is even and returns true or false
   ```js
   const checkIfIseven = (num: number) => {
     let mod = num % 2;
     if ((mod = 0)) {
       return true;
     }
     return false;
   };
   ```
3. I declare a ` fetchData` function which takes a page number parameter who's default value is 1 because on page load, the first page should be displayed in th UI. This function checks if the page number is even by passing it to `checkIfIsEven` and assigning it to a variable `isQueryNumberEven` which returns `true` or `false`.

```js
let isPageNumberEven = checkIfIseven(pageNumber);
```

4. if `isPageNumberEven` returns true we declare a variable `queryParamNumber`, assign it to the value of `pageNumber - 1` and make a GET request to the endpoint

passing in the `queryParamNumber` variable as the value for the query string "page" else we make the GET request with the pageNumber parameter as the value for the query string page on the endpoint

```js
if ((isPageNumberEven = true)) {
  let queryParamNumber = pageNumber - 1;
  res = await fetch(
    `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${queryParamNumber}`
  );
} else {
  res = await fetch(
    `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${pageNumber}`
  );
}
```

5. I convert the returning response into a valid json object, destructure the `result` array from the response, retrieve the first item in the array and get the appropriate key from the `pageNumber` parameter. After that i assign it to a `pageResults` variable and return the value.

```js
let pageResults: any;
return (pageResults = results[0][pageNumber]);
```

6. i declare a `fetchAndInsertPageData` variable which fetches and returns the appropriate pageResults, loops through the pageResults and assigns the current iteration of the pageResults variable to a `data` variable, creates a new row in the table body for each iteration, inserts 3 cells into the first 3 positions of the new row.

```js

let pageResults = await fetchData(pageNumber);

for(const response in pageResults) {
    const data = pageResults[response];
    let newRow     = tableBody?.insertRow(parseIn(response)!;
    let rowCell    = newRow?.insertCell(0);
    let genderCell = newRow?.insertCell(1);
    let ageCell    = newRow?.insertCell(2);
    ...
}
```

7. I extract all the properties from the `data`variable including the `id`, `row`, `gender`, `age`, assign them to variables, create a text node for each one and append to the appropriate row cell

```js
        for(const response in pageResults) {
            const data = pageResults[response];
            let newRow = tableBody?.insertRow(parseInt(response))!;

            let rowCell = newRow?.insertCell(0);
            let genderCell = newRow?.insertCell(1);
            let ageCell = newRow?.insertCell(2);

            newRow.dataset.entryid = data?.id;

            let row = data?.row
            let rowText = document.createTextNode(row);

            let gender = data?.gender;
            let gendertext = document.createTextNode(gender);

            let age = data?.age;
            let ageText = document.createTextNode(age)

            rowCell?.append(rowText)
            genderCell?.append(gendertext);
            ageCell?.append(ageText)
        }
```

8. i declare a utility function that sets the data for the navigation items with the page number as a parameter. It sets the dataset for prevbtn to the page parameter minus 1 `page - 1`, sets the dataset for nextbtn to the page parameter plus 1 `page + 1` , sets the dataset for pageview on the page label to the page `page`, and sets the innerHTML of the page label to a string `Showing Page ${page}`

```js
const setNavData = (page: number) => {
  prevBtn.dataset.prevbtn = `${page - 1}`;
  nextBtn.dataset.nextbtn = `${page + 1}`;
  pageLabel.dataset.pageview = `${page}`;
  pageLabel.innerHTML = `Showing Page ${page}`;
};
```

9. I declare another utility function that returns the set pagenumber dataset of either of our two buttons

```js
const getPageNumberFromBtnDataset = (btn: any, dataset: string) => {
  let pageNumber: any = btn.getAttribute(dataset);
  pageNumber = parseInt(pageNumber);
  return pageNumber;
};
```

10. II declare another utility function that checks if we are at the first page and disables the previous button

```js
const checkForPrevPageEnd = () => {
  let pageNumber = getPageNumberFromBtnDataset(prevBtn, "data-prevbtn");
  if (pageNumber === 0) {
    prevBtn.disabled = true;
    return;
  } else {
    prevBtn.disabled = false;
  }
};
```

11. On page load, we set the innerHTML for the table body to an empty string `tableBody.innerHTML = ''`, fetch and insert the page data `await fetchAndInsertPageData()`, set the navigation data for page 1 `setNavData(1)`, and disable the previous button after confirming that we are on page 1 ` checkForPrevPageEnd()`.

12. We create click event listeners for the `nextBtn` and `prevBtn`. On click of any of the buttons, we prevent the default behavior `e.preventDefault()`, set the table body innerHTML an empty string `tableBody.innerHTML = ''`, get the page number we should navigate to from the clicked button `let pageNumber = getPageNumberFromBtnDataset(nextBtn, 'data-nextbtn')`, fetch and insert page data `await fetchAndInsertPageData(pageNumber)`, set the navigation data `setNavData(pageNumber)`, and lastly check if the page is the last in order to either disable the `prevBtn`

```js
nextBtn.onclick = async (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";
  let pageNumber = getPageNumberFromBtnDataset(nextBtn, "data-nextbtn");
  await fetchAndInsertPageData(pageNumber);
  setNavData(pageNumber);
  checkForPrevPageEnd();
};

prevBtn.onclick = async (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";
  let pageNumber = getPageNumberFromBtnDataset(prevBtn, "data-prevbtn");
  await fetchAndInsertPageData(pageNumber);
  setNavData(pageNumber);
  checkForPrevPageEnd();
};
```
