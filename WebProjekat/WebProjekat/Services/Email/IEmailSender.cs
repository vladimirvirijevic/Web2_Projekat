namespace WebProjekat.Services.Email
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
        string GenerateConfirmationToken();
    }
}
