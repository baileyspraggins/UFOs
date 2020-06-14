// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");


function buildTable(data) {
    // Create an empty table to put our data in
    tbody.html("");

    //Loop through each object in the data & append a row and cells for each value in the row
    data.forEach((dataRow) => {

        // Append a row to the table body
        let row = tbody.append("tr");

        // Loop through each field in the dataRow and add each value as a table cell
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
    
}

// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  let filterElement = d3.select(this);
  
  let filterValue = filterElement.property('value');

  let filterId = filterElement.attr('id');

  console.log(filterValue, filterId)
  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if (filterValue) {
    filters[filterId] = filterValue

  }

  else {
    delete filters[filterId]

  }


  // Call function to apply all filters and rebuild the table
  filterTable();
}

function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData

  console.log(filters);
  // Loop through all of the filters and keep any data that
  // matches the filter values
  Object.keys(filters).forEach((key) => {
    filteredData = filteredData.filter(row => row[key] === filters[key]);

  });

  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("input").on("change", updateFilters);


// Build the table when the page loads
buildTable(tableData);
