//* Simple

// Function to fetch and visualize data for a given location and date range
function fetchAndVisualizeData(location, startDate, endDate) {
  var dataset = ee
    .ImageCollection("NASA/GSFC/MERRA/rad/2")
    .filter(ee.Filter.date(startDate, endDate))
    .mean();

  // Fetch the values for the specified location
  var point = ee.Geometry.Point([location.lon, location.lat]);
  var ghi =
    dataset
      .select("SWGDN")
      .reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: point,
        scale: 500,
      })
      .get("SWGDN")
      .getInfo() || 0;

  var dni =
    dataset
      .select("SWTDN")
      .reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: point,
        scale: 500,
      })
      .get("SWTDN")
      .getInfo() || 0;

  var dhi =
    dataset
      .select("SWGNT")
      .reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: point,
        scale: 500,
      })
      .get("SWGNT")
      .getInfo() || 0;

  var surfaceTemp =
    dataset
      .select("TS")
      .reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: point,
        scale: 500,
      })
      .get("TS")
      .getInfo() || 0;

  // Display the values
  var panel = ui.Panel([
    ui.Label("Global Horizontal Irradiance (GHI): " + ghi + " W/m^2"),
    ui.Label("Direct Normal Irradiance (DNI): " + dni + " W/m^2"),
    ui.Label("Diffuse Horizontal Irradiance (DHI): " + dhi + " W/m^2"),
    ui.Label("Surface Temperature: " + surfaceTemp + " K"),
  ]);
  Map.add(panel);

  // Create a chart
  var chart = ui.Chart.array
    .values({
      array: [ghi, dni, dhi, surfaceTemp],
      axis: 0,
      xLabels: ["GHI", "DNI", "DHI", "Surface Temperature"],
    })
    .setChartType("ColumnChart");

  chart.setOptions({
    title: "Irradiance and Temperature at Specified Location",
    hAxis: { title: "Parameter" },
    vAxis: { title: "Value" },
    legend: { position: "none" },
  });

  // Add the chart to the map
  Map.add(chart);

  // Set map center to the location
  Map.setCenter(location.lon, location.lat, 5);
}

// UI elements
var lonInput = ui.Textbox("Enter longitude", "-95");
var latInput = ui.Textbox("Enter latitude", "39");
var startDateInput = ui.Textbox("Enter start date (YYYY-MM-DD)", "2022-02-01");
var endDateInput = ui.Textbox("Enter end date (YYYY-MM-DD)", "2022-02-02");
var submitButton = ui.Button("Submit", function () {
  var lon = parseFloat(lonInput.getValue());
  var lat = parseFloat(latInput.getValue());
  var startDate = startDateInput.getValue();
  var endDate = endDateInput.getValue();
  fetchAndVisualizeData({ lon: lon, lat: lat }, startDate, endDate);
});

// Add UI elements to the map
Map.add(
  ui.Panel(
    [lonInput, latInput, startDateInput, endDateInput, submitButton],
    ui.Panel.Layout.flow("horizontal")
  )
);
Map.setCenter(-95, 39, 2); // Default map center
