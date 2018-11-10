using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
  public class UserForRegisterDto
  {
    [Required]
    public string Username { get; set; }

    [Required]
    [StringLength(16, MinimumLength = 7, ErrorMessage = "You must specify password between 7 and 16 characters")]
    public string Password { get; set; }
  }
}