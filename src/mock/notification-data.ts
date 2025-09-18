import { NotificationItem } from "~/components/top-notification";

export const data: NotificationItem[] = [
  { id: "1", title: "Welcome to the platform!", description: "Thanks for signing up. Explore and enjoy.", type: 'success', read: false, },
  { id: "2", title: "New feature released", description: "Dark mode is now available in your settings.", type: 'info', read: false },
  { id: "3", title: "Password changed", description: "Your password was updated successfully.", type: 'success', read: true },
  { id: "4", title: "Security alert", description: "A new login from Berlin, Germany was detected.", type: 'error', read: false },
  { id: "5", title: "Invoice #102938 ready", description: "Your monthly invoice is available for download.", type: 'payment', read: true },
  { id: "6", title: "Profile approved", description: "Your identity verification has been completed.", type: 'warning', read: false },
  { id: "7", title: "Team invite received", description: "John Doe invited you to join the Marketing team.", type: 'success', read: false },
  { id: "8", title: "Data export complete", description: "The CSV file is ready for download.", type: 'payment', read: true },
  { id: "9", title: "API rate limit warning", description: "You have used 80% of your monthly quota.", type: 'info', read: false },
  { id: "10", title: "Scheduled maintenance", description: "The service will be offline on Sunday 2-4 AM UTC.", type: 'error', read: true },
  { id: "11", title: "Payment received", description: "Thank you, your payment of $99.00 was processed.", type: 'success', read: false },
  { id: "12", title: "Two-factor authentication enabled", description: "Your account is now more secure.", type: 'payment', read: true },
  { id: "13", title: "New comment on task", description: "Alice commented on 'Update landing page'.", type: 'success', read: false },
  { id: "14", title: "Storage limit reached", description: "You have exceeded 90% of your storage space.", type: 'info', read: false },
  { id: "15", title: "Webhook endpoint failing", description: "Your endpoint returned 404 for the last 5 attempts.", type: 'warning', read: true },
  { id: "16", title: "New user guide available", description: "Check out the updated getting-started guide.", type: 'success', read: false },
  { id: "17", title: "Certificate expires soon", description: "SSL certificate for example.com expires in 7 days.", type: 'info', read: false },
  { id: "18", title: "Backup successful", description: "Daily backup completed at 03:12 AM.", type: 'error', read: true },
  { id: "19", title: "Promotion unlocked", description: "You earned a 20% discount on your next upgrade.", type: 'payment', read: false },
  { id: "20", title: "Account suspended", description: "Contact support to resolve a billing issue.", type: 'info', read: false }
];

export default data;