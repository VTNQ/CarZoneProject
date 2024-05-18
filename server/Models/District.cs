using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("District")]
public partial class District
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    public int IdCity { get; set; }

    [Required]
    public bool? IsDelete { get; set; }

    [ForeignKey("IdCity")]
    [InverseProperty("Districts")]
    public virtual City IdCityNavigation { get; set; } = null!;

    [InverseProperty("IdDistrictNavigation")]
    public virtual ICollection<Showroom> Showrooms { get; set; } = new List<Showroom>();
}
