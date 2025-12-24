المشروع الأول
# OfferMe - Service Marketplace Platform

## Project Purpose

OfferMe is a B2B service marketplace platform that connects service providers with clients seeking professional services. The system enables clients to post detailed service requests with specifications, deadlines, and budget ranges, while service providers can browse opportunities and submit competitive offers. The platform streamlines the entire workflow from request posting through offer evaluation, negotiation, and deal finalization, serving both individual clients and business providers operating across multiple geographical regions and service categories.

## System Scope

The platform is a monolithic Laravel-based application with a clear separation between API backend and administrative dashboard. The system operates as a complete standalone platform with RESTful API endpoints for mobile applications and a web-based admin panel for platform management. The architecture supports real-time communication features through Laravel Broadcasting and integrates with external services for push notifications and payment processing.

## My Technical Role

I was responsible for the complete backend development of the platform, including RESTful API design and implementation, database schema design and migrations, authentication and authorization systems, real-time chat messaging infrastructure, push notification system with multilingual support, file upload and media management, dynamic field system for category-specific request attributes, offer management workflow with status tracking, and integration with Firebase Cloud Messaging for mobile notifications.

## Backend Architecture Highlights

The API follows RESTful principles with resource-based endpoints organized by domain (requests, offers, chat, profile, etc.). Authentication is handled through Laravel Sanctum with token-based access control and ability-based permissions distinguishing between client, provider, and dual-role users. The system implements a dual-API approach with separate endpoints for mobile users and admin panel, both secured with appropriate authentication guards.

Data flow is request-driven with Eloquent ORM handling database interactions. Real-time features use Laravel Broadcasting with presence channels for chat functionality, allowing instant message delivery and read status tracking. The architecture implements event-driven notifications where business actions (offer submissions, status changes, message sends) trigger push notifications automatically.

Key architectural decisions include role-based query scoping where data access is automatically filtered based on user roles, multilingual content management through the Spatie Translatable package allowing dynamic field and content translation, and a flexible dynamic field system that enables category-specific request attributes without schema changes. The system also implements soft deletes for data retention and comprehensive API logging middleware for debugging and audit trails.

## Database & Data Handling

The system uses MySQL/MariaDB as the relational database with Eloquent ORM for object-relational mapping. The schema design emphasizes normalization with separate tables for users, clients, and providers, connected through one-to-one relationships. Many-to-many relationships handle provider-category associations, provider-city associations, and offer attachment associations.

The database implements foreign key constraints with cascade deletions to maintain referential integrity. The offers table uses boolean flags for status tracking (is_new, is_viewed, is_shortlist, is_eliminated, is_escalated, is_awarded) instead of enum strings, providing flexibility for multiple concurrent states and easy querying. Soft deletes are implemented on critical models like dynamic fields to preserve historical data.

Performance strategies include eager loading relationships to prevent N+1 query problems, database indexes on frequently queried columns (user_id, provider_id, request_id, status fields), and pagination on all list endpoints to handle large datasets efficiently. The system also implements query scopes for reusable filtering logic.

## Key Engineering Challenges

**Multi-Role User System**: Implementing a unified authentication system where users can simultaneously act as both clients and providers required careful permission design. The solution involved ability-based tokens where Sanctum tokens carry role abilities, allowing the same user account to access different features based on their role context without requiring separate authentication flows.

**Real-Time Chat with Presence Tracking**: Building a thread-based messaging system with read receipts and online user detection required integrating Laravel Broadcasting with presence channels. The challenge was managing thread creation logic to prevent duplicate threads between users and tracking message read status across multiple participants. This was solved through participant pivot tables with seen_at timestamps and event broadcasting for real-time updates.

**Multilingual Push Notifications**: The requirement to send push notifications in user-preferred languages while maintaining a single notification record created complexity in the FCM integration. The solution involved storing language preferences in FCM token registrations, grouping notifications by language, and sending parallel notification batches to Firebase Cloud Messaging, all while maintaining a single database notification record with JSON-translatable content.

**Dynamic Field System**: Creating a flexible schema for category-specific request attributes without altering the core requests table required a polymorphic relationship approach. The implementation uses a dynamic_fields table with category associations and a request_field_values pivot table, allowing administrators to define custom fields per category (text, select, numeric) with validation rules, while maintaining type safety and query performance through Eloquent relationships.

**Offer Status Workflow Management**: Managing complex offer lifecycle states (new, viewed, favorite, shortlisted, eliminated, escalated, awarded) while ensuring business rules (only one award per request, automatic elimination of others) required careful state machine implementation. The solution uses atomic database updates, event-driven notifications, and transaction-based operations to maintain consistency when deals are finalized.

## Impact & Value

The platform enables efficient matching between service seekers and providers, reducing time-to-contract significantly through streamlined offer comparison and evaluation workflows. The real-time communication features facilitate quick negotiations and clarifications, improving deal closure rates. The dynamic field system allows the platform to adapt to different service categories without code changes, supporting business expansion into new verticals.

The multilingual notification system ensures all users receive updates in their preferred language, improving engagement rates and user satisfaction. The comprehensive admin dashboard provides platform operators with full visibility into system activity, user behavior, and business metrics, enabling data-driven decisions. The role-based access control and permission system ensures data security and appropriate feature access based on user roles.

## Technologies & Tools

**Languages & Frameworks**: PHP 8.1+, Laravel 10, Laravel Sanctum for API authentication, Laravel Broadcasting for real-time features

**Database**: MySQL/MariaDB, Eloquent ORM, database migrations

**External Services**: Firebase Cloud Messaging for push notifications, Google APIs for FCM authentication

**Laravel Packages**: Spatie Laravel Permission for role management, Spatie Laravel Translatable for multilingual content, Propaganistas Laravel Phone for phone number validation, Rolandstarke Laravel Thumbnail for image processing, Nadar Quill Delta Parser for rich text handling

**Development Tools**: Docker and Docker Compose for containerization, Composer for dependency management, Laravel Pint for code formatting

**Additional**: API resource classes for response transformation, custom middleware for API logging and translation, event-driven architecture with Laravel Events

## Project Classification

**Type**: Company / Freelance Project

**Privacy**: Private (NDA may apply - check project agreements)

**Status**: Production system



المشروع الثاني
# Pear - Telemedicine Platform

## Project Purpose

Pear is a telemedicine platform that connects healthcare providers with clients for remote consultations and medical services. The system enables clients to search for healthcare providers by specialty, book consultation sessions, and conduct real-time video consultations. The platform serves healthcare providers who offer their services remotely and clients seeking convenient access to medical consultations, particularly useful for follow-up visits, mental health counseling, and specialized consultations.

## System Scope

The platform is a monolithic Laravel application with separate API endpoints for mobile clients and an administrative dashboard. The system operates as a complete telehealth solution integrating video conferencing capabilities through Agora SDK, appointment scheduling with availability management, and payment processing. It functions as a standalone platform managing the entire workflow from provider registration and verification through session completion and billing.

## My Technical Role

I was responsible for the complete backend development including RESTful API design and implementation, database schema design for booking and scheduling system, real-time video session management with Agora integration, availability and time slot management system, authentication and authorization with role-based access control, push notification system with multilingual support, payment processing integration with Stripe, document verification workflow for provider onboarding, chat messaging system for pre and post-consultation communication, and webhook handling for third-party service integrations.

## Backend Architecture Highlights

The API follows RESTful conventions with resource-based endpoints organized by domain functionality (bookings, sessions, availabilities, slots, profiles, chat). Authentication is implemented using Laravel Sanctum with token-based access control and ability-based permissions that distinguish between providers (with approval status), clients, and administrators. The system implements separate authentication guards for API users and admin panel access.

Data flow is request-driven with Eloquent ORM handling database interactions. Real-time video sessions are managed through Agora SDK integration with dynamic token generation for secure room access. The architecture implements a polymorphic relationship system where sessions can be associated with different bookable items (bookings, events), providing flexibility for various consultation types. Availability management uses recurring schedule patterns stored at the provider level, with time slots dynamically generated and managed at the session level.

Key architectural decisions include a polymorphic session model that allows sessions to be linked to bookings or standalone events, slot-based scheduling system where providers define availability patterns and clients book specific time slots, webhook-based Agora event logging for session tracking and analytics, document verification workflow with admin approval gates, and an event-driven notification system where booking status changes trigger push notifications automatically.

## Database & Data Handling

The system uses MySQL/MariaDB as the relational database with Eloquent ORM for object-relational mapping. The schema design emphasizes relationship modeling with separate tables for providers, clients, bookings, sessions, slots, and availabilities. The booking model uses polymorphic relationships to support different consultation types, while slots are managed separately to handle time-specific availability.

The database implements foreign key constraints with appropriate cascade behaviors. The availability table stores recurring weekly schedules (day, from, to), while slots table stores specific datetime ranges for actual sessions. Bookings use status enums (pending, approved, declined, canceled) with query scopes for filtering. Sessions track their relationship to bookings polymorphically and maintain status lifecycle (upcoming, ongoing, completed, canceled).

Performance strategies include eager loading relationships to prevent N+1 queries in listing endpoints, database indexes on frequently queried columns (provider_id, client_id, status, datetime fields), pagination on all list endpoints, and query scopes for reusable filtering logic. The system also implements soft deletes on critical models to preserve historical data for auditing.

## Key Engineering Challenges

**Agora Video Integration**: Integrating real-time video conferencing required secure token generation for each session participant, handling room lifecycle events through webhooks, and managing session state synchronization between database and Agora platform. The challenge was ensuring tokens are generated only when sessions are active and handling edge cases like premature disconnections or network failures. This was solved through webhook event logging that tracks all Agora room events, allowing reconstruction of session history and proper billing calculations.

**Availability and Slot Management**: Creating a flexible scheduling system where providers define recurring availability patterns but clients book specific time slots required separating availability (recurring templates) from slots (concrete time instances). The challenge was preventing double-booking, handling timezone conversions, and managing slot availability as sessions are created or canceled. The solution involved slot reservation during booking creation, atomic database operations for slot status updates, and availability calculation that considers existing bookings and provider-set holidays.

**Document Verification Workflow**: Implementing a provider verification system where providers upload documents that require admin approval before they can accept bookings created complexity in permission management. Providers needed access to profile management but restricted booking acceptance until verified. This was solved through ability-based tokens with intermediate states (provider-notApproved, provider-full), allowing conditional feature access based on verification status.

**Payment Capture Timing**: Managing payment processing where funds are captured only after session completion or provider approval required implementing a hold-and-capture mechanism. The challenge was handling refunds for canceled sessions, partial payments for rescheduled bookings, and ensuring financial transactions are properly recorded. The solution involved invoice generation linked to bookings, status-based payment triggers, and integration with Stripe for secure payment processing with webhook callbacks for payment status updates.

**Session State Management**: Maintaining consistent session state across database records, Agora rooms, and user notifications required careful event coordination. Sessions needed to transition through states (upcoming, ongoing, completed) based on both scheduled times and actual room join/leave events. This was solved through webhook event processing that updates session status in real-time, combined with scheduled tasks for time-based state transitions.

## Impact & Value

The platform enables healthcare providers to expand their reach beyond physical locations, increasing patient access to medical services especially in underserved areas. The automated scheduling system reduces administrative overhead for providers by handling appointment management, availability tracking, and client communications. The integrated video conferencing eliminates the need for external tools, providing a seamless consultation experience.

The document verification workflow ensures platform quality by vetting providers before they can accept bookings, building trust with clients. The flexible scheduling system accommodates various consultation types from one-time appointments to recurring therapy sessions. The comprehensive notification system keeps all parties informed of booking status changes, reducing missed appointments and improving engagement.

## Technologies & Tools

**Languages & Frameworks**: PHP 8.1+, Laravel 10, Laravel Sanctum for API authentication, Laravel Broadcasting for real-time features

**Database**: MySQL/MariaDB, Eloquent ORM, database migrations

**External Services**: Agora.io for video conferencing, Firebase Cloud Messaging for push notifications, Stripe for payment processing, Google APIs for FCM authentication

**Laravel Packages**: Spatie Laravel Permission for role management, Spatie Laravel Translatable for multilingual content, Pusher for real-time broadcasting, Maltekuhr Laravel GPT for AI features, Propaganistas Laravel Phone for phone validation, Rolandstarke Laravel Thumbnail for image processing

**Development Tools**: Docker and Docker Compose for containerization, Composer for dependency management, Laravel Pint for code formatting

**Additional**: API resource classes for response transformation, custom middleware for API logging and translation, webhook handlers for third-party integrations, event-driven architecture with Laravel Events

## Project Classification

**Type**: Company / Freelance Project

**Privacy**: Private (NDA may apply - check project agreements)

**Status**: Production system


الثالث
# E-Learning System - University Course Management Platform

## Project Purpose

The E-Learning System is a comprehensive online education platform designed for universities and educational institutions. It enables teachers to create and manage courses with structured content including videos, quizzes, and attachments, while students can enroll in courses, track their progress, and complete assessments. The platform supports hierarchical organization through universities, colleges, and study years, making it suitable for formal academic environments where course content needs to align with institutional curricula.

## System Scope

The platform is a Django-based monolithic application built with Django REST Framework, designed to serve as a complete Learning Management System (LMS). It operates as a standalone platform managing courses, enrollments, payments, and content delivery. The system includes an administrative dashboard for content management and a comprehensive API for mobile and web clients. Background task processing through Celery handles asynchronous operations like video processing and email notifications.

## My Technical Role

I was responsible for the backend architecture and development including Django REST Framework API design and implementation, database schema design with proper relationships between universities, colleges, courses, and enrollments, course content management system with chapters and videos, enrollment and payment processing system, quiz system with questions and assessments, user authentication with JWT tokens, role-based access control (RBAC) for teachers, students, and admins, video upload and management with resumable upload support, coupon and discount system for course pricing, content categorization and filtering, and background task processing with Celery for asynchronous operations.

## Backend Architecture Highlights

The API follows RESTful principles using Django REST Framework with ViewSets and Serializers for consistent data transformation. Authentication is implemented using Django REST Framework SimpleJWT with refresh token rotation and token blacklisting. The system implements a multi-level hierarchy: Universities contain Colleges, which contain Courses organized by Study Year, allowing content organization that matches institutional structures.

Data flow is request-driven with Django ORM handling database interactions. Background tasks are processed through Celery with Redis as the message broker, handling video processing, email sending, and other time-intensive operations. The architecture implements a comprehensive RBAC system where permissions are defined at the model level and enforced through custom permission classes, allowing granular access control.

Key architectural decisions include a status-based workflow where courses move through states (DRAFT, PENDING, PUBLISHED, ARCHIVED) requiring admin approval, enrollment tracking with progress percentage calculation based on completed chapters and videos, resumable file upload support using django-tus and drf-chunked-upload for handling large video files, polymorphic content structure where courses contain chapters which contain videos or other content types, and a coupon system integrated with enrollments allowing discounts and promotional pricing.

## Database & Data Handling

The system uses PostgreSQL as the primary database with Django ORM for object-relational mapping. The schema design emphasizes hierarchical relationships with ForeignKey constraints ensuring referential integrity. The course structure uses a parent-child relationship where courses contain chapters, and chapters contain videos or other content items. Enrollment tracking stores progress at the enrollment level, calculating completion based on watched videos and completed quizzes.

The database implements proper indexing on frequently queried fields (teacher_id, student_id, course_id, status fields) to optimize query performance. Enrollments track financial information separately from course pricing, allowing historical price preservation when courses are updated. The quiz system stores questions with multiple choice options, and responses are tracked separately to support retakes and progress tracking.

Performance strategies include select_related and prefetch_related for optimizing relationship queries, database-level constraints for data integrity, pagination on all list endpoints, and query optimization through Django's QuerySet API. The system implements soft deletes on critical models and uses database transactions for financial operations to ensure consistency.

## Key Engineering Challenges

**Resumable Video Uploads**: Handling large video file uploads that may be interrupted required implementing resumable upload protocols. The challenge was supporting both TUS protocol and chunked uploads, managing partial uploads, and ensuring file integrity after completion. This was solved through integration of django-tus and drf-chunked-upload packages, implementing upload session tracking, and validation upon completion.

**Enrollment Progress Calculation**: Calculating accurate progress percentages required tracking multiple completion criteria (videos watched, quizzes completed, chapters finished) and updating progress in real-time as students interact with content. The challenge was maintaining performance when calculating progress for many enrollments and handling edge cases like content updates after enrollment. The solution involved denormalized progress fields updated through signals, combined with background tasks for batch recalculations when course content changes.

**RBAC Implementation**: Creating a flexible permission system that supports multiple roles (student, teacher, admin, superuser) with different access levels across various models required careful permission class design. The challenge was ensuring permissions are enforced consistently across API endpoints and admin interfaces. This was solved through custom permission classes that check user roles and model-level permissions, combined with Django's built-in permission system for admin access.

**Course Status Workflow**: Managing course lifecycle from creation through publication required approval workflows where teachers create content but admins must approve before students can enroll. The challenge was handling state transitions, preventing content changes after publication without proper versioning, and ensuring published courses remain stable. The solution involved status field with constrained transitions, preventing edits to published courses except by admins, and maintaining draft versions for updates.

**Payment Integration**: Processing course enrollments with payment integration required handling multiple payment statuses, coupon validation, and ensuring enrollment is only created after successful payment. The challenge was preventing race conditions in payment processing and handling partial payments or refunds. This was solved through transaction-based enrollment creation, payment status tracking separate from enrollment status, and webhook handling for payment gateway callbacks.

## Impact & Value

The platform enables educational institutions to deliver structured online courses with proper academic organization through university and college hierarchies. The progress tracking system provides students with clear visibility into their learning journey while giving teachers insights into student engagement. The quiz system supports formal assessments with automatic grading for objective questions.

The enrollment and payment system automates course registration and fee collection, reducing administrative overhead. The content management system allows teachers to organize complex course materials into logical chapters and sections. The resumable upload feature ensures large video files can be reliably uploaded even with unstable network connections, critical for educational content delivery.

## Technologies & Tools

**Languages & Frameworks**: Python 3.x, Django 5.0+, Django REST Framework 3.15+, Django REST Framework SimpleJWT for authentication

**Database**: PostgreSQL, Django ORM, database migrations

**Background Processing**: Celery 5.3+, Redis 5.0+ for message broker, django-celery-beat for scheduled tasks

**File Upload**: django-tus for TUS protocol support, drf-chunked-upload for chunked uploads, boto3 for S3 storage integration

**External Services**: AWS S3 for media storage, email services for notifications

**Django Packages**: django-cors-headers for CORS handling, django-filter for query filtering, django-jazzmin for admin UI customization, django-admin-argon-dashboard for enhanced admin interface, phonenumbers for phone validation, reportlab for PDF generation, cryptography for DRM and encryption

**Development Tools**: Docker and Docker Compose, pip for dependency management, pytest for testing, Django Debug Toolbar for development

**Additional**: Custom permission classes, API serializers for data transformation, Django signals for event handling, management commands for administrative tasks, localization support for multi-language content

## Project Classification

**Type**: Company / Freelance Project

**Privacy**: Private (NDA may apply - check project agreements)

**Status**: Production system


الرابع
# Umrain - Multi-Vendor Travel & Booking Marketplace

## Project Purpose

Umrain is a comprehensive multi-vendor travel and booking marketplace platform that enables vendors to list and manage various travel-related services including hotels, tours, flights, boats, cars, and event spaces. The platform serves as a complete booking solution where customers can search, compare, and book travel services from multiple vendors in a single unified interface. It functions as a B2B2C marketplace connecting service providers (hotels, tour operators, car rental agencies) with end customers, handling the entire booking workflow from search and selection through payment and fulfillment.

## System Scope

The platform is a large-scale modular Laravel application with a plugin-based architecture allowing extensibility and customization. It operates as a complete ecosystem managing multiple service types (hotels, tours, flights, boats, cars, spaces, events), each with its own booking logic, pricing models, and availability management. The system includes vendor management capabilities, customer booking interfaces, administrative dashboards, and extensive customization options through themes and modules. It integrates with multiple payment gateways, supports various currencies, and handles complex pricing scenarios including seasonal rates, discounts, and commissions.

## My Technical Role

I was responsible for backend architecture and core module development including modular architecture design with service-specific modules (Hotel, Tour, Flight, Car, Boat, Space), unified booking system that handles multiple service types through polymorphic relationships, payment gateway integrations (Stripe, PayPal, Paystack, MyFatoorah, Flutterwave, and others), commission and revenue sharing system for marketplace operations, multi-currency support with dynamic currency conversion, availability management systems for time-based and inventory-based services, pricing engine handling dynamic pricing, seasonal rates, and discounts, vendor management system with capabilities and permissions, review and rating system across all service types, and integration with mapping services for location-based features.

## Backend Architecture Highlights

The API follows RESTful principles with module-specific endpoints organized by service type. Authentication supports multiple methods including Laravel Sanctum for API access, Laravel Fortify for web authentication, and social authentication through Laravel Socialite. The system implements a polymorphic booking model where bookings can reference any service type (hotel, tour, flight) through object_id and object_model fields, allowing unified booking management across diverse service types.

Data flow is request-driven with Eloquent ORM handling database interactions. The architecture is modular with each service type (Hotel, Tour, Flight, etc.) implemented as a separate module following consistent patterns but with service-specific logic. Real-time features use Laravel Broadcasting with Pusher for notifications and updates. The system implements a comprehensive permission system using Spatie Laravel Permission, allowing fine-grained control over vendor capabilities and admin access.

Key architectural decisions include a polymorphic Bookable interface that all service types implement, allowing consistent booking processing while maintaining service-specific attributes, module-based architecture where each travel service type is a self-contained module with models, controllers, and views, theme system allowing frontend customization without core code changes, plugin architecture supporting payment gateway plugins and custom features, location-based services with hierarchical location management (country, state, city), and multi-language support through translation packages for international markets.

## Database & Data Handling

The system uses MySQL/MariaDB as the primary database with Eloquent ORM for object-relational mapping. The schema design emphasizes flexibility through polymorphic relationships, allowing the booking system to handle multiple service types without schema changes. Each service type has its own tables (bravo_hotels, bravo_tours, bravo_flights) but shares common booking infrastructure through the bravo_bookings table with polymorphic references.

The database implements extensive use of JSON fields for flexible data storage (policies, extra pricing, service fees, surrounding information), allowing service-specific attributes without schema modifications. Foreign key constraints ensure referential integrity while cascade behaviors handle data cleanup. The system uses nested sets (Kalnoy NestedSet) for hierarchical data like locations and categories.

Performance strategies include comprehensive database indexing on frequently queried columns (vendor_id, object_id, status, date ranges), eager loading relationships to prevent N+1 queries, query result caching for frequently accessed data like locations and categories, pagination on all listing endpoints, and database query optimization through Eloquent query builders. The system implements soft deletes extensively to preserve historical data for reporting and auditing.

## Key Engineering Challenges

**Polymorphic Booking System**: Creating a unified booking system that works across completely different service types (hotels with rooms and dates, tours with fixed schedules, flights with seat selection, cars with rental periods) required abstracting common booking patterns while allowing service-specific logic. The challenge was handling different availability models (inventory-based for hotels, capacity-based for tours, seat-based for flights) within a single booking flow. This was solved through a Bookable interface that each service implements, defining service-specific availability checks, pricing calculations, and booking validation while the core booking system handles common operations.

**Multi-Vendor Commission System**: Implementing revenue sharing where the platform takes commissions from vendor bookings while supporting different commission models (percentage, fixed amount, per-person) and commission timing (at booking, at completion, on cancellation) created complexity in financial calculations. The challenge was accurately tracking commissions, handling refunds with commission adjustments, and generating financial reports. The solution involved commission calculation at booking time, separate commission tracking in booking records, and commission reversal logic in cancellation workflows.

**Dynamic Pricing Engine**: Supporting complex pricing scenarios including base prices, seasonal adjustments, extra person charges, service fees, discounts, and coupon applications required a flexible pricing calculation system. The challenge was ensuring price calculations are consistent, transparent to customers, and properly applied across different booking scenarios. This was solved through a pricing calculation service that applies pricing rules in order, with each service type defining its specific pricing logic while following common interfaces.

**Availability Management**: Handling availability for different service types with distinct models (hotel room inventory per date, tour departure dates with capacity, flight seats, car rental periods) required service-specific availability systems while maintaining a consistent interface. The challenge was preventing overbooking, handling concurrent booking attempts, and efficiently querying availability across date ranges. This was solved through atomic database operations for availability updates, optimistic locking for concurrent bookings, and service-specific availability query optimizations.

**Multi-Currency Support**: Supporting transactions in multiple currencies with real-time exchange rates required currency conversion at various points (display, booking, payment, reporting). The challenge was maintaining price accuracy, handling currency fluctuations, and ensuring consistent currency handling throughout the booking flow. The solution involved storing prices in base currency with exchange rate tracking, converting at display time using current rates, and recording transaction currency for accurate financial reporting.

**Vendor Management and Permissions**: Creating a flexible system where vendors have different capabilities (some can list hotels, others tours, with varying access levels) required dynamic permission management. The challenge was allowing vendors to manage their own listings while preventing unauthorized access to other vendors' data or admin functions. This was solved through role-based permissions with vendor-specific data scoping, ensuring queries automatically filter by vendor_id, and admin override capabilities.

## Impact & Value

The platform enables travel service vendors to reach a wider audience through a unified marketplace, reducing the need for individual booking systems and marketing efforts. The multi-service approach provides customers with a one-stop booking experience, increasing convenience and encouraging multiple bookings. The commission-based revenue model allows the platform to scale without upfront costs to vendors.

The modular architecture allows rapid addition of new service types without disrupting existing functionality, supporting business expansion. The flexible pricing and availability systems accommodate diverse business models across different travel service types. The comprehensive booking management system reduces operational overhead for vendors through automated booking processing, payment handling, and customer communications.

## Technologies & Tools

**Languages & Frameworks**: PHP 8.1+, Laravel 10, Laravel Sanctum for API authentication, Laravel Fortify for web authentication, Laravel Socialite for social login

**Database**: MySQL/MariaDB, Eloquent ORM, Kalnoy NestedSet for hierarchical data

**Real-Time**: Pusher for real-time notifications and broadcasting, Laravel Broadcasting

**Payment Gateways**: Stripe, PayPal (Omnipay), Paystack, MyFatoorah, Flutterwave, TwoCheckout, and others through plugin architecture

**External Services**: AWS S3 or Google Cloud Storage for media, various mapping engines for location services, email services (Mailgun, Postmark), WhatsApp API for notifications

**Laravel Packages**: Spatie Laravel Permission for RBAC, Spatie Laravel Translatable for multi-language, Munafio Chatify for messaging, Livewire for reactive components, Mews Purifier for content sanitization, Maatwebsite Excel for data export, League Flysystem for cloud storage

**Additional Packages**: BotMan for chatbot functionality, Eluceo iCal for calendar integration, GeoIP2 for location detection, Intervention Image for image processing, SimpleSoftwareIO QR Code for QR generation, Stichoza Google Translate for content translation

**Development Tools**: Docker and Docker Compose, Composer for dependency management, Laravel Pint for code formatting, Laravel Debugbar for development

**Architecture**: Module-based architecture with custom service providers, theme system for frontend customization, plugin system for extensibility, custom helper classes and traits

## Project Classification

**Type**: Company / Freelance Project

**Privacy**: Private (NDA may apply - check project agreements)

**Status**: Production system


الخامس
# Jaramana Clinic Center - Medical Management System

## Project Purpose

Jaramana Clinic Center is a comprehensive medical clinic management system designed to streamline healthcare operations for clinics and medical centers. The platform enables patients to book appointments with doctors, access their medical records, and communicate with healthcare providers, while medical staff can manage appointments, create medical records, and maintain work schedules. The system serves medical clinics seeking to digitize their operations, improve patient engagement, and maintain comprehensive medical documentation in compliance with healthcare data standards.

## System Scope

The platform is a Spring Boot-based monolithic application with RESTful API endpoints serving both web and mobile clients. It operates as a complete clinic management solution handling appointment booking, medical record management, doctor scheduling, patient communication, and administrative functions. The system integrates with external services for push notifications, WhatsApp messaging for OTP authentication, and real-time communication through WebSocket connections. It functions as a standalone platform managing the entire patient-doctor-clinic workflow from appointment scheduling through post-consultation record management.

## My Technical Role

I was responsible for the complete backend development including Spring Boot RESTful API design and implementation, database schema design with JPA entities and relationships, dual authentication system with separate endpoints for employees and patients using JWT tokens, appointment booking system with availability checking and conflict resolution, medical record management with diagnosis, prescription, and vital signs tracking, work schedule management with day-of-week and time slot definitions, holiday management preventing appointments during doctor holidays, real-time chat system using WebSocket for patient-doctor communication, push notification integration with Firebase Cloud Messaging, WhatsApp OTP integration for secure authentication, email verification system, and comprehensive exception handling with custom exception classes.

## Backend Architecture Highlights

The API follows RESTful principles with controller-based endpoints organized by domain functionality (bookings, medical records, schedules, chat, authentication). Authentication is implemented using Spring Security with JWT tokens, with separate authentication controllers and services for employees (doctors, nurses, admins) and patients, preventing security vulnerabilities from client-controlled headers. The system implements role-based access control through Spring Security, distinguishing between ROLE_DOCTOR, ROLE_NURSE, ROLE_ADMIN, and ROLE_PATIENT with endpoint-level authorization.

Data flow is request-driven with JPA/Hibernate ORM handling database interactions through repository pattern. Real-time communication uses WebSocket connections with STOMP protocol for chat messaging, allowing bidirectional communication between patients and doctors. The architecture implements a comprehensive audit system tracking entity creation, modification, and deletion timestamps. Background job processing handles scheduled tasks like appointment optimization and token cleanup.

Key architectural decisions include separate authentication endpoints for employees and patients to ensure security and single-table queries, polymorphic booking model supporting bookings for someone else with parent-child relationships for rescheduling, work schedule system with day-of-week patterns and time slots preventing double-booking, medical record finalization preventing modifications after record completion, and comprehensive DTO mapping using MapStruct for type-safe entity-to-DTO transformations.

## Database & Data Handling

The system uses PostgreSQL as the primary database with JPA/Hibernate for object-relational mapping. The schema design emphasizes entity relationships with proper foreign key constraints ensuring referential integrity. Separate tables exist for employees and patients inheriting from BaseUser, while bookings reference both patients and doctors with clinic associations. Medical records link to bookings, patients, and doctors, maintaining complete audit trails.

The database implements comprehensive relationships including many-to-many for clinic-employee associations, one-to-many for bookings and medical records, and cascading operations for data consistency. Work schedules use day-of-week enumeration with time ranges, while holidays store date ranges preventing appointment conflicts. The chat system uses session-based messaging with participant tracking.

Performance strategies include lazy loading for relationships to prevent N+1 queries, database indexing on frequently queried columns (patient_id, doctor_id, appointment_date_time, status fields), pagination support in repository methods, and query optimization through JPA criteria API for complex filtering. The system implements soft delete patterns through isActive flags and uses database transactions for consistency in booking operations.

## Key Engineering Challenges

**Dual Authentication System Security**: Implementing secure authentication for two distinct user types (employees and patients) required preventing client-controlled authentication logic that could lead to security vulnerabilities. The challenge was avoiding header-based user type identification which allows manipulation, while ensuring efficient single-table queries. This was solved through separate authentication endpoints (/api/auth/employee/login and /api/auth/patient/login), allowing server-side control of user type determination and preventing information disclosure attacks.

**Appointment Availability Calculation**: Calculating real-time availability requires considering work schedules (day-of-week patterns with time slots), existing bookings, doctor holidays, and appointment slot durations. The challenge was efficiently querying availability across date ranges while preventing double-booking and handling edge cases like overlapping schedules or holiday conflicts. The solution involved work schedule templates with day-of-week patterns, holiday date range checking, existing booking conflict detection, and dynamic slot generation based on appointment duration settings.

**Medical Record Finalization**: Implementing an immutable medical record system where records can be modified until finalized but become read-only afterward required careful state management. The challenge was ensuring record integrity while allowing doctors to update records during consultation but preventing changes after completion. This was solved through isFinalized boolean flag with business logic preventing modifications, maintaining record history through versioning concepts, and ensuring records link to completed bookings.

**WebSocket Chat Security**: Implementing secure real-time chat where messages are only accessible to authorized participants (patient-doctor pairs) required authentication and authorization at the WebSocket level. The challenge was ensuring users can only access their own chat sessions and preventing unauthorized message interception. This was solved through WebSocket channel interceptors validating JWT tokens, session-based access control where participants are verified before allowing connections, and message routing ensuring delivery only to authorized recipients.

**Holiday Conflict Resolution**: Preventing appointments during doctor holidays while allowing holidays to span multiple days and overlap with work schedules required complex conflict detection. The challenge was efficiently checking holiday conflicts during availability calculation without performance degradation. This was solved through holiday date range storage with start and end dates, efficient date range overlap queries using JPA criteria, integration with work schedule checking, and validation at booking creation preventing conflicting appointments.

**Rescheduling with History Tracking**: Supporting appointment rescheduling while maintaining history of all changes required parent-child booking relationships. The challenge was preventing infinite rescheduling chains, maintaining proper booking status transitions, and ensuring parent bookings are properly marked when rescheduled. This was solved through parentBooking foreign key creating booking chains, status management where original bookings are marked appropriately, and validation preventing rescheduling of already rescheduled bookings.

## Impact & Value

The platform digitizes clinic operations, reducing manual paperwork and administrative overhead for medical staff. The appointment booking system enables patients to schedule appointments conveniently while preventing double-booking and scheduling conflicts. The medical record system maintains comprehensive patient history, improving continuity of care and supporting better treatment decisions.

The work schedule and holiday management system optimizes doctor availability, ensuring efficient appointment distribution and preventing overbooking. The real-time chat feature facilitates patient-doctor communication outside of appointments, improving patient engagement and satisfaction. The dual authentication system ensures secure access for both medical staff and patients, maintaining HIPAA-compliant security standards.

## Technologies & Tools

**Languages & Frameworks**: Java 17, Spring Boot 3.2.8, Spring Security for authentication and authorization, Spring Data JPA for database access, Spring WebSocket for real-time communication

**Database**: PostgreSQL, H2 for testing, Flyway for database migrations, JPA/Hibernate ORM

**Security**: JWT (JSON Web Tokens) using jjwt library, BCrypt for password hashing, Spring Security filters and authentication providers

**Real-Time Communication**: Spring WebSocket with STOMP protocol, WebSocket channel interceptors for security

**External Services**: Firebase Admin SDK for push notifications, UltraMsg WhatsApp API for OTP delivery, Spring Mail for email services

**API Documentation**: SpringDoc OpenAPI (Swagger) for API documentation

**Build Tool**: Maven for dependency management and build automation

**Development Tools**: Lombok for reducing boilerplate code, MapStruct for DTO-Entity mapping, Spring Boot DevTools for development efficiency

**Additional**: Custom exception handling with global exception handlers, audit logging through entity listeners, scheduled tasks using Spring's @Scheduled annotation, validation using Jakarta Bean Validation

## Project Classification

**Type**: Company / Freelance Project

**Privacy**: Private (NDA may apply - check project agreements)

**Status**: Production system

