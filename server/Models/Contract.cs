using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Contract")]
public partial class Contract
{
    [Key]
    public int Id { get; set; }

    public int IdOrder { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Condition { get; set; } = null!;

    public DateOnly CreatedDate { get; set; }

    [ForeignKey("IdOrder")]
    [InverseProperty("Contracts")]
    public virtual OutOrder IdOrderNavigation { get; set; } = null!;
}
