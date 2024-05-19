using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("InVoice")]
public partial class InVoice
{
    [Key]
    public int Id { get; set; }

    public int IdOrder { get; set; }

    public DateOnly CreateDate { get; set; }

    [ForeignKey("IdOrder")]
    [InverseProperty("InVoices")]
    public virtual OutOrder IdOrderNavigation { get; set; } = null!;
}
