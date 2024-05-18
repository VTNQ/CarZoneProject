using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("City")]
public partial class City
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    public int IdCountry { get; set; }

    [Required]
    public bool? IsDelete { get; set; }

    [InverseProperty("IdCityNavigation")]
    public virtual ICollection<District> Districts { get; set; } = new List<District>();

    [ForeignKey("IdCountry")]
    [InverseProperty("Cities")]
    public virtual Country IdCountryNavigation { get; set; } = null!;
}
