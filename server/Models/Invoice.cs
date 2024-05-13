using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Invoice")]
public partial class Invoice
{
    [Key]
    public int Id { get; set; }

    public int IdOrder { get; set; }

    public DateOnly CreateDate { get; set; }

    [ForeignKey("IdOrder")]
    [InverseProperty("Invoices")]
    public virtual OutOrder IdOrderNavigation { get; set; } = null!;
}
