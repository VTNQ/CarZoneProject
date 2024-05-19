using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Country")]
public partial class Country
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [Required]
    public bool? IsDelete { get; set; }

    [InverseProperty("IdCountryNavigation")]
    public virtual ICollection<Brand> Brands { get; set; } = new List<Brand>();

    [InverseProperty("IdCountryNavigation")]
    public virtual ICollection<City> Cities { get; set; } = new List<City>();

    [InverseProperty("IdCountryNavigation")]
    public virtual ICollection<Suplier> Supliers { get; set; } = new List<Suplier>();

    [InverseProperty("IdCountryNavigation")]
    public virtual ICollection<Warehouse> Warehouses { get; set; } = new List<Warehouse>();
}
