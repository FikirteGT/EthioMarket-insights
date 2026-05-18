## Plan for Farmer Market Price Intelligence Tool (Ethiopia)

**1. Project Setup & Initial UI (Frontend Engineer)**
    *   Set up the React/Next.js project.
    *   Create the following initial pages/components:
        *   **Home Page:** App name, description, and "Start Analysis" button.
        *   **Farmer Input Page:** Forms for:
            *   Farmer Location (Region, City/Woreda)
            *   Product Selection (Dropdown)
            *   Quantity and Unit (kg/quintal)
            *   Transport Method and Cost (per km or flat)
            *   Selling Option (Specific Market vs. Find Best Place)
    *   Ensure UI is clean, mobile-friendly, and uses farmer-friendly language.
    *   Implement basic navigation between pages.

**2. Data Simulation & Mock Data (Frontend Engineer)**
    *   Create mock data for:
        *   Market Prices (NMIS-like format: Market name, Region, Product, Price, Date)
        *   Transport Rates (based on method and distance)
    *   Structure the mock data so it can be easily replaced with real data later.
    *   This will involve creating dummy CSV or JSON files and loading them in the frontend.

**3. Core Analysis Engine (Backend Logic - to be handled by Frontend Engineer for prototype)**
    *   Implement the logic to:
        *   Calculate distance (can be simulated or a simple placeholder for now).
        *   Estimate transport cost based on distance and method.
        *   Calculate net profit: (Product Price × Quantity) - Transport Cost.
        *   Rank markets based on net profit.
    *   This logic will initially reside within the frontend components for the prototype.

**4. Results Page (Frontend Engineer)**
    *   Display the top 1-3 markets with:
        *   Market name, Region
        *   Product price
        *   Transport cost
        *   Net profit
    *   Implement a "Price trend indicator" (simulated: Rising, Stable, Falling).
    *   Implement a "Data reliability label" (e.g., "High (Official NMIS weekly data)").

**5. Refinements & Optional Features (Frontend Engineer)**
    *   Add a bar chart for net profit comparison.
    *   Add a map visualization (can be a placeholder image or a simple representation initially).
    *   (Optional) Implement "Price trend over last 4 weeks" mini-chart.
    *   (Optional) Implement "Wait or sell now?" indicator.
    *   (Optional) Download results as PDF.

**6. Final Validation**
    *   Ensure all buttons and flows are functional with simulated data.
    *   Verify the UI is clean and mobile-friendly.
    *   Review the separation of concerns (UI vs. calculation logic).
