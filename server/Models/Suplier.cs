using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Suplier")]
public partial class Suplier
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string Type { get; set; } = null!;

    public int IdCountry { get; set; }

    [StringLength(200)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [ForeignKey("IdCountry")]
    [InverseProperty("Supliers")]
    public virtual Country IdCountryNavigation { get; set; } = null!;
}
