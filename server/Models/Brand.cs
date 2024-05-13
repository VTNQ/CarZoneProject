using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Brand")]
public partial class Brand
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [StringLength(200)]
    [Unicode(false)]
    public string Logo { get; set; } = null!;

    [Column("headquarters")]
    [StringLength(300)]
    [Unicode(false)]
    public string Headquarters { get; set; } = null!;

    public int IdCountry { get; set; }

    [ForeignKey("IdCountry")]
    [InverseProperty("Brands")]
    public virtual Country IdCountryNavigation { get; set; } = null!;

    [InverseProperty("IdBrandNavigation")]
    public virtual ICollection<Model> Models { get; set; } = new List<Model>();
}
