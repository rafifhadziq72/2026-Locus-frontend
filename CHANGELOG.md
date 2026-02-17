# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-17

### Added
- **Initial Dashboard Release:** Web Admin Dashboard built with React and TypeScript for managing room bookings.
- **API Service Layer:** Axios-based integration for communicating with the Locus Backend API.
- **Booking Management UI:** Interface for viewing, approving, and rejecting booking requests.
- **Audit Documentation:** Comprehensive `README.md` detailing frontend setup and component structure.

### Fixed
- **Loading State Glitch:** Resolved an issue in `BookingModal.tsx` where the submit button remained in a "Booking..." state after a validation error.
- **Validation Feedback:** Implemented error message rendering to notify users of booking conflicts (e.g., 400 Bad Request responses).
- **State Resilience:** Added `finally` blocks to form submission logic to ensure the UI remains interactive after API failures.

### Changed
- **History Visibility:** Updated the main dashboard table to display all records, including historical and soft-deleted entries, for improved audit transparency.
- **Project Structure:** Standardized component organization and commit history according to PBL 2026 guidelines.

---
*Generated for the PBL 2026 Audit - Politeknik Elektronika Negeri Surabaya (PENS)*