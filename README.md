<p align="center">
  <img src="./ReadMeAssets/LayOffHeader.gif" alt="LayOff WebApp Logo" width="200">
</p>
<h1 align="center">LayOff WebApp</h1>

<p align="center">
  The LayOff WebApp is a dynamic platform designed to provide real-time gameplay balancing and adjustment capabilities for our game, LayOff. It allows for data-driven decisions through detailed player analytics and supports live-ops functionality for a seamless gaming experience.
</p>

<p align="center">
  <a href="https://namesarehard.ca/" target="_blank">View live page here</a>
</p>


<h2>Installation</h2>

<p>To set up the project locally, follow these steps:</p>

<pre>
<code>
git clone https://github.com/AlexBuzmion/LayOff-WebApp.git
cd LayOff-WebApp
# Install dependencies
npm install
# Start the development server
npm run serve
</code>
</pre>

<h2>Project Overview</h2>
<p>
  The LayOff WebApp was developed to support the development team by enabling informed decisions about gameplay balancing and real-time adjustments for LayOff. It simulates a live-ops system by allowing real-time changes to the game build, capturing and analyzing detailed player data, and providing actionable insights that drive game optimization and player engagement.
</p>

<h2>Technology Stack</h2>
<ul>
  <li><strong>Programming Languages:</strong> JavaScript, Vue.js</li>
  <li><strong>State Management:</strong> Pinia</li>
  <li><strong>Backend:</strong> Node.js</li>
  <li><strong>Game Integration:</strong> Unity Cloud Services API</li>
</ul>

<h2>Key Features</h2>
<h3>Data-Driven Gameplay Balancing</h3>
<p>
  The web app captures detailed player data, including kills, deaths, and trap placements, which is stored in Unity Cloud Save. This data-driven approach allows for precise gameplay tuning and swift responses to player feedback.
</p>

<h3>Player Activity Map</h3>
<p>
  The app visualizes player movements and actions on the game map, offering filters for specific players and sessions. This turns raw data into actionable insights that help balance gameplay and refine mechanics based on real player behavior.
</p>

<h3>Remote Config System</h3>
<p>
  A remote configuration system allows instant updates to game settings, such as player movement speed and trap cooldowns, without needing new builds. This flexibility enhances adaptability and real-time gameplay optimization.
</p>

<h2>My Contributions</h2>
<ul>
  <li><strong>Custom Data Structure in Unity:</strong> Designed and implemented a <code>PlayerStats</code> class in Unity, enabling detailed tracking of player activities for subsequent analysis.</li>
  <li><strong>Saving Data to Unity Cloud Save:</strong> Developed methods for securely saving player activity data to Unity Cloud Save, ensuring real-time availability and seamless web app integration.</li>
  <li><strong>Optimized In-Game Logging:</strong> Refined the <code>CustomCharacterMovement</code> script to log player actions efficiently, reducing file size through a custom <code>FloatPair</code> structure.</li>
  <li><strong>Data Presentation and API Integration:</strong> Built a web application to display game statistics using Unity Cloud Services API, with Vue.js for the frontend and Pinia for state management.</li>
  <li><strong>Remote Config:</strong> Implemented a remote configuration system to dynamically update game settings, enhancing the game’s adaptability and real-time optimization.</li>
</ul>

<!-- PROJECT FILES DESCRIPTION -->
<h2 id="project-files-description"> :floppy_disk: Project Files Description</h2>

<h3>Components</h3>
<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>ChartController.vue</b></td>
      <td>Controls the display and behavior of various chart types within the app.</td>
    </tr>
    <tr>
      <td><b>LoginView.vue</b></td>
      <td>Manages user authentication and login process.</td>
    </tr>
    <tr>
      <td><b>Modal.vue</b></td>
      <td>Handles the display and functionality of modal dialogs.</td>
    </tr>
    <tr>
      <td><b>NavBar.vue</b></td>
      <td>Manages the navigation bar and links between different sections of the app.</td>
    </tr>
    <tr>
      <td><b>TelemetryChart.vue</b></td>
      <td>Displays telemetry data in a chart format for real-time analysis.</td>
    </tr>
  </tbody>
</table>

<h3>Router</h3>
<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>index.js</b></td>
      <td>Configures and manages routes for navigating between different views of the app.</td>
    </tr>
  </tbody>
</table>

<h3>Services</h3>
<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>unityService.js</b></td>
      <td>Handles communication with Unity Cloud Services API for retrieving and updating game data.</td>
    </tr>
  </tbody>
</table>

<h3>Stores</h3>
<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>chartInfo.js</b></td>
      <td>Stores and manages data specific to the charts displayed in the app.</td>
    </tr>
    <tr>
      <td><b>cloudSaveData.js</b></td>
      <td>Manages the storage and retrieval of data from Unity Cloud Save.</td>
    </tr>
    <tr>
      <td><b>remoteConfigData.js</b></td>
      <td>Manages the retrieval and application of remote configuration settings from Unity.</td>
    </tr>
  </tbody>
</table>

<h3>Utility</h3>
<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>utils.js</b></td>
      <td>Contains utility functions used throughout the app, such as encoding credentials and handling common tasks.</td>
    </tr>
  </tbody>
</table>

<h3>Views</h3>
<table>
  <thead>
    <tr>
      <th>File</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>AboutView.vue</b></td>
      <td>Displays information about the app and its purpose.</td>
    </tr>
    <tr>
      <td><b>ChartsView.vue</b></td>
      <td>Central view for displaying various charts and data visualizations.</td>
    </tr>
    <tr>
      <td><b>HomeView.vue</b></td>
      <td>The main landing page of the app, introducing users to its functionalities.</td>
    </tr>
    <tr>
      <td><b>RemoteConfigurations.vue</b></td>
      <td>Interface for managing and applying remote configuration settings.</td>
    </tr>
    <tr>
      <td><b>App.vue</b></td>
      <td>The root component that encapsulates the entire app structure.</td>
    </tr>
  </tbody>
</table>


<h2>Usage</h2>

<p>Launch the web app, log in, and use the dashboard to view and analyze game data. You can also manage remote configurations for the game, adjust settings in real-time, and monitor player activities to ensure optimal gameplay balance.</p>

<h2>Scenarios</h2>

<!-- SCENARIO1 -->
<h3 id="scenario1"> :small_orange_diamond: Scenario 1: Data Collection and Analysis</h3>
<p>This scenario describes how the LayOff WebApp collects and analyzes player data to inform game balancing decisions. The data collection process occurs in Unity during gameplay, where key player actions are logged, compiled, and saved to Unity Cloud Save once a match is completed.</p>

<p align="center"> 
<img src="./ReadMeAssets/dataAnalysis.gif" alt="Data Collection and Analysis">
</p>

<p>As players engage in the game, various data points such as kills, deaths, and trap placements are logged and sent to Unity Cloud Save:</p>

<ul>
  <li>The <code>CustomCharacterMovement.cs</code> script logs each player action in Unity during gameplay.</li>
  <li>The <code>PlayerStatsManager.cs</code> script compiles these logs and sends them to Unity Cloud Save.</li>
  <li>The <code>unityService.js</code> service retrieves this data for display on the web app.</li>
</ul>

<p>Steps to analyze player data:</p>

<pre><code>$ Data is logged during gameplay via CustomCharacterMovement.cs and PlayerStatsManager.cs in Unity
$ Data is saved to Unity Cloud Save
$ unityService.js retrieves the data and displays it in the web app for analysis
</code></pre>


<!-- SCENARIO2 -->
<h3 id="scenario2"> :small_orange_diamond: Scenario 2: Player Activity Mapping</h3>
<p>This scenario covers the visualization of player movements and actions within the game map, enabling developers to identify trends and areas for improvement.</p>

<p align="center"> 
<img src="./ReadMeAssets/playerMapping.gif" alt="Player Activity Mapping">
</p>

<p>The player activity map is generated from the data collected during gameplay:</p>

<ul>
  <li>The <code>unityService.js</code> retrieves player location and action data from Unity Cloud Save.</li>
  <li>The <code>ScatterChart.vue</code> and <code>RadarChart.vue</code> components visualize this data on the web app, allowing developers to filter by player and session.</li>
</ul>

<p>Steps to visualize player activity:</p>

<pre><code>$ unityService.js retrieves player data
$ ScatterChart.vue and RadarChart.vue display player activities on the map
$ Developers use filters to analyze specific players or sessions
</code></pre>

<!-- SCENARIO3 -->
<h3 id="scenario3"> :small_orange_diamond: Scenario 3: Remote Configuration and Real-Time Updates</h3>
<p>This scenario demonstrates how the LayOff WebApp allows developers to make real-time adjustments to game settings without requiring new builds.</p>

<p align="center"> 
<img src="./ReadMeAssets/remoteConfig.gif" alt="Remote Configuration">
</p>

<p>The remote configuration system enables dynamic updates:</p>

<ul>
  <li>The <code>RemoteConfigurations.vue</code> interface allows developers to change settings like player movement speed or trap cooldowns.</li>
  <li>The <code>remoteConfigData.js</code> store manages the retrieval and application of these settings from Unity Cloud Services.</li>
</ul>

<p>Steps to apply remote configurations:</p>

<pre><code>$ Access RemoteConfigurations.vue to adjust settings
$ remoteConfigData.js retrieves and applies these changes in real-time
$ Game updates instantly without needing new builds
</code></pre>

<h2>Contributing</h2>
<p>Fork the repository and submit a pull request with your improvements or bug fixes.</p>

<h2>License</h2>
<p>This project is licensed under the <a href="LICENSE">MIT License</a>.</p>
