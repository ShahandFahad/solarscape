//* Enhaced UI

// Function to fetch and visualize data for a given location and date range
function fetchAndVisualizeData(location, startDate, endDate) {
  loadingLabel.style().set("shown", true);

  // Ensure dates are valid
  try {
    var startDateParsed = ee.Date(startDate);
    var endDateParsed = ee.Date(endDate);
  } catch (e) {
    loadingLabel.setValue("Invalid date format. Please use YYYY-MM-DD.");
    loadingLabel.style().set("shown", true);
    return;
  }

  var dataset = ee
    .ImageCollection("NASA/GSFC/MERRA/rad/2")
    .filter(ee.Filter.date(startDateParsed, endDateParsed))
    .mean();

  // Fetch the values for the specified location
  var point = ee.Geometry.Point([location.lon, location.lat]);

  var data = dataset.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 500,
    maxPixels: 1e9,
  });

  var ghi = data.get("SWGDN");
  var dni = data.get("SWTDN");
  var dhi = data.get("SWGNT");
  var surfaceTemp = data.get("TS");

  // Remove previous result panel and layers
  if (resultPanel) {
    Map.remove(resultPanel);
  }
  Map.layers().remove(ghiLayer);
  Map.layers().remove(dniLayer);
  Map.layers().remove(dhiLayer);
  Map.layers().remove(surfaceTempLayer);

  // Add layers for each parameter
  ghiLayer = ui.Map.Layer(
    dataset
      .select("SWGDN")
      .visualize({ min: 0, max: 1000, palette: ["blue", "green", "red"] }),
    {},
    "GHI"
  );
  dniLayer = ui.Map.Layer(
    dataset
      .select("SWTDN")
      .visualize({ min: 0, max: 1000, palette: ["blue", "green", "red"] }),
    {},
    "DNI"
  );
  dhiLayer = ui.Map.Layer(
    dataset
      .select("SWGNT")
      .visualize({ min: 0, max: 1000, palette: ["blue", "green", "red"] }),
    {},
    "DHI"
  );
  surfaceTempLayer = ui.Map.Layer(
    dataset
      .select("TS")
      .visualize({ min: 200, max: 300, palette: ["blue", "green", "red"] }),
    {},
    "Surface Temp"
  );

  Map.layers().add(ghiLayer);
  Map.layers().add(dniLayer);
  Map.layers().add(dhiLayer);
  Map.layers().add(surfaceTempLayer);

  // Create a panel to display the results
  resultPanel = ui.Panel({
    style: {
      position: "bottom-left",
      padding: "16px",
      width: "400px",
    },
  });

  var closeButton = ui.Button({
    label: "Close",
    onClick: function () {
      Map.remove(resultPanel);
      resultPanel = null;
    },
  });

  var resultContent = ui.Panel([
    ui.Label(
      "Global Horizontal Irradiance (GHI): " +
        (ghi ? ghi.getInfo().toFixed(2) : "N/A") +
        " W/m^2"
    ),
    ui.Label(
      "Direct Normal Irradiance (DNI): " +
        (dni ? dni.getInfo().toFixed(2) : "N/A") +
        " W/m^2"
    ),
    ui.Label(
      "Diffuse Horizontal Irradiance (DHI): " +
        (dhi ? dhi.getInfo().toFixed(2) : "N/A") +
        " W/m^2"
    ),
    ui.Label(
      "Surface Temperature: " +
        (surfaceTemp ? surfaceTemp.getInfo().toFixed(2) : "N/A") +
        " K"
    ),
    closeButton,
  ]);

  resultPanel.add(resultContent);
  Map.add(resultPanel);

  // Create a chart
  var chart = ui.Chart.array
    .values({
      array: [
        ghi ? ghi.getInfo() : 0,
        dni ? dni.getInfo() : 0,
        dhi ? dhi.getInfo() : 0,
        surfaceTemp ? surfaceTemp.getInfo() : 0,
      ],
      axis: 0,
      xLabels: ["GHI", "DNI", "DHI", "Surface Temp"],
    })
    .setChartType("ColumnChart");

  chart.setOptions({
    title: "Irradiance and Temperature at Specified Location",
    hAxis: { title: "Parameter" },
    vAxis: { title: "Value" },
    legend: { position: "none" },
  });

  resultPanel.add(chart);

  // Set map center to the location
  Map.setCenter(location.lon, location.lat, 5);

  // Hide loading label
  loadingLabel.style().set("shown", false);
}

// UI elements
var lonInput = ui.Textbox("Enter longitude", "73.0479"); // Example for Pakistan
var latInput = ui.Textbox("Enter latitude", "33.6844"); // Example for Pakistan
var startDateInput = ui.Textbox("Enter start date (YYYY-MM-DD)", "2023-01-01");
var endDateInput = ui.Textbox("Enter end date (YYYY-MM-DD)", "2023-01-02");
var loadingLabel = ui.Label("Loading...", { shown: false });
var resultPanel = null;
var ghiLayer = null;
var dniLayer = null;
var dhiLayer = null;
var surfaceTempLayer = null;

var submitButton = ui.Button("Submit", function () {
  var lon = parseFloat(lonInput.getValue());
  var lat = parseFloat(latInput.getValue());
  var startDate = startDateInput.getValue();
  var endDate = endDateInput.getValue();
  fetchAndVisualizeData({ lon: lon, lat: lat }, startDate, endDate);
});

// Create a panel for inputs and submit button
var inputPanel = ui.Panel(
  [
    ui.Label("Enter coordinates and date range:", { fontWeight: "bold" }),
    ui.Panel(
      [ui.Label("Longitude"), lonInput],
      ui.Panel.Layout.flow("horizontal")
    ),
    ui.Panel(
      [ui.Label("Latitude"), latInput],
      ui.Panel.Layout.flow("horizontal")
    ),
    ui.Panel(
      [ui.Label("Start Date"), startDateInput],
      ui.Panel.Layout.flow("horizontal")
    ),
    ui.Panel(
      [ui.Label("End Date"), endDateInput],
      ui.Panel.Layout.flow("horizontal")
    ),
    submitButton,
    loadingLabel,
  ],
  ui.Panel.Layout.flow("vertical"),
  { padding: "8px" }
);

// Add input panel to the map
Map.add(inputPanel);
Map.setCenter(73.0479, 33.6844, 5); // Default map center for Pakistan
