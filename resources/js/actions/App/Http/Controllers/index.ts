import StripeWebhookController from './StripeWebhookController'
import InviteAcceptanceController from './InviteAcceptanceController'
import OnboardingController from './OnboardingController'
import DashboardController from './DashboardController'
import DiscountTicketController from './DiscountTicketController'
import InviteTicketController from './InviteTicketController'
import CompanyServiceController from './CompanyServiceController'
import CommunityController from './CommunityController'
import ProfilePhotoController from './ProfilePhotoController'
import MessageController from './MessageController'
import NotificationController from './NotificationController'
import ServicePurchaseController from './ServicePurchaseController'
import TicketPurchaseController from './TicketPurchaseController'
import BillingController from './BillingController'
import SubscriptionController from './SubscriptionController'
import CompanyEmployeeController from './CompanyEmployeeController'
import SubscriptionSuccessController from './SubscriptionSuccessController'
import UpcomingEventsController from './UpcomingEventsController'
import Settings from './Settings'

const Controllers = {
    StripeWebhookController: Object.assign(StripeWebhookController, StripeWebhookController),
    InviteAcceptanceController: Object.assign(InviteAcceptanceController, InviteAcceptanceController),
    OnboardingController: Object.assign(OnboardingController, OnboardingController),
    DashboardController: Object.assign(DashboardController, DashboardController),
    DiscountTicketController: Object.assign(DiscountTicketController, DiscountTicketController),
    InviteTicketController: Object.assign(InviteTicketController, InviteTicketController),
    CompanyServiceController: Object.assign(CompanyServiceController, CompanyServiceController),
    CommunityController: Object.assign(CommunityController, CommunityController),
    ProfilePhotoController: Object.assign(ProfilePhotoController, ProfilePhotoController),
    MessageController: Object.assign(MessageController, MessageController),
    NotificationController: Object.assign(NotificationController, NotificationController),
    ServicePurchaseController: Object.assign(ServicePurchaseController, ServicePurchaseController),
    TicketPurchaseController: Object.assign(TicketPurchaseController, TicketPurchaseController),
    BillingController: Object.assign(BillingController, BillingController),
    SubscriptionController: Object.assign(SubscriptionController, SubscriptionController),
    CompanyEmployeeController: Object.assign(CompanyEmployeeController, CompanyEmployeeController),
    SubscriptionSuccessController: Object.assign(SubscriptionSuccessController, SubscriptionSuccessController),
    UpcomingEventsController: Object.assign(UpcomingEventsController, UpcomingEventsController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers