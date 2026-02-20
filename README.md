(OPTIONAL) Assignment 4 - Brushing and Linking
===

## My data set that I chose was this Kaggle dataset
  - https://www.kaggle.com/datasets/saidaminsaidaxmadov/chocolate-sales?select=Chocolate+Sales+%282%29.csv
    - The csv file was not changed at all, but in my script, I did do some cleaning and convert the numeric fields.
 
## This is the link to my visualization
  - https://witchystar.github.io/a4-linkedviews/

## Visualization Description
My visualization provides a dual-view exploration of the Chocolate Sales csv. It contains 2 parts:
  1) Scatterplot: This chart maps "Boxes Shipped" against "Amount" to reveal the relationship between volume and revenue for individual sales entries. It incorporates an interactive brush, a click and drag tool, that allows you to select a specific subset of data points directly on the plot. When a region is "brushed," the selected points turn orange to provide immediate visual confirmation of your selection.
  2) Linked Bar Chart: This chart aggregates the total sales "Amount" by "Country". It is dynamically linked to the scatterplot; as you adjust your brush selection, the bar chart instantly updates to reflect the totals for only the specific transactions you have highlighted.

## My Technical Achievements
  - Interactive Linking & Brushing: I implemented a d3.brush() overlay that captures user input coordinates and filters the global dataset in real-time.
  - Robust Data Sanitization: I overcame a frustrating coding hurdle by using regular expressions (/[$,]/g) to strip currency symbols and commas from the CSV strings, converting them into valid floating-point numbers for calculation.
  - Dynamic DOM Manipulation: The updateBar function uses the "Enter-Update-Exit" pattern (via .remove() and fresh appends) to re-render the bar chart scales and axes dynamically based on filtered subsets of data.

## My Design Achievements
  - Visual Continuity: I used a consistent color palette, Steel Blue for default states and Orange for selected/highlighted states, to create a clear mental link between the two charts.
  - Intuitive Feedback: By adjusting the opacity of the scatterplot dots, I managed any overplotting, which allows the user to see density in the sales data more clearly.
  - Clean Layout: I utilized a standard margin convention (top, right, bottom, left) to ensure that axes and labels remain legible and do not bleed into the edges of the SVG containers.
