@echo off
(
echo /* Patient Management Styles */
echo.
echo .patients-container {
echo   padding: 24px;
echo }
echo.
echo .patients-header {
echo   display: flex;
echo   justify-content: space-between;
echo   align-items: center;
echo   margin-bottom: 24px;
echo }
echo.
echo .add-patient-btn {
echo   display: flex;
echo   align-items: center;
echo   gap: 8px;
echo   padding: 10px 16px;
echo   background: #2563eb;
echo   color: white;
echo   border: none;
echo   border-radius: 8px;
echo   cursor: pointer;
echo   font-size: 14px;
echo   font-weight: 500;
echo }
echo.
echo .add-patient-btn:hover {
echo   background: #1d4ed8;
echo }
echo.
echo .search-section {
echo   background: white;
echo   padding: 16px;
echo   border-radius: 8px;
echo   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1^);
echo   margin-bottom: 24px;
echo }
echo.
echo .search-input {
echo   width: 100%%;
echo   padding: 10px 16px 10px 40px;
echo   border: 1px solid #e5e7eb;
echo   border-radius: 8px;
echo   font-size: 14px;
echo }
echo.
echo .search-input:focus {
echo   outline: none;
echo   border-color: #2563eb;
echo   box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1^);
echo }
echo.
echo .patients-grid {
echo   display: grid;
echo   grid-template-columns: repeat(auto-fill, minmax(350px, 1fr^)^);
echo   gap: 20px;
echo }
echo.
echo .patient-card {
echo   background: white;
echo   border: 1px solid #e5e7eb;
echo   border-radius: 8px;
echo   padding: 20px;
echo   cursor: pointer;
echo   transition: all 0.2s;
echo }
echo.
echo .patient-card:hover {
echo   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1^);
echo   transform: translateY(-2px^);
echo }
echo.
echo .patient-header {
echo   display: flex;
echo   justify-content: space-between;
echo   align-items: start;
echo   margin-bottom: 12px;
echo }
echo.
echo .patient-name {
echo   font-size: 18px;
echo   font-weight: 600;
echo   color: #111827;
echo   margin: 0;
echo }
echo.
echo .patient-age {
echo   font-size: 14px;
echo   color: #6b7280;
echo }
echo.
echo .risk-badge {
echo   padding: 4px 12px;
echo   border-radius: 9999px;
echo   font-size: 12px;
echo   font-weight: 500;
echo }
echo.
echo .risk-low {
echo   background: #d1fae5;
echo   color: #065f46;
echo }
echo.
echo .risk-medium {
echo   background: #fef3c7;
echo   color: #92400e;
echo }
echo.
echo .risk-high {
echo   background: #fee2e2;
echo   color: #991b1b;
echo }
echo.
echo .patient-info {
echo   display: flex;
echo   flex-direction: column;
echo   gap: 8px;
echo   margin-bottom: 16px;
echo }
echo.
echo .info-row {
echo   display: flex;
echo   align-items: center;
echo   gap: 8px;
echo   font-size: 14px;
echo   color: #4b5563;
echo }
echo.
echo .patient-footer {
echo   display: flex;
echo   justify-content: space-between;
echo   align-items: center;
echo   padding-top: 12px;
echo   border-top: 1px solid #e5e7eb;
echo }
echo.
echo .status-badge {
echo   display: flex;
echo   align-items: center;
echo   gap: 6px;
echo   padding: 4px 12px;
echo   border-radius: 9999px;
echo   font-size: 12px;
echo   font-weight: 500;
echo }
echo.
echo .status-active {
echo   background: #d1fae5;
echo   color: #065f46;
echo }
echo.
echo .status-needs-attention {
echo   background: #fee2e2;
echo   color: #991b1b;
echo }
echo.
echo .action-buttons {
echo   display: flex;
echo   gap: 8px;
echo }
echo.
echo .action-btn {
echo   padding: 6px 12px;
echo   border: none;
echo   background: none;
echo   color: #2563eb;
echo   font-size: 14px;
echo   font-weight: 500;
echo   cursor: pointer;
echo }
echo.
echo .action-btn:hover {
echo   color: #1d4ed8;
echo   text-decoration: underline;
echo }
) > src\styles\Patients.css
echo Patient styles created successfully!