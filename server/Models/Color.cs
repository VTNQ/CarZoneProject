using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Color")]
public partial class Color
{
    [Key]
    public int Id { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [InverseProperty("IdColorInSideNavigation")]
    public virtual ICollection<Car> CarIdColorInSideNavigations { get; set; } = new List<Car>();

    [InverseProperty("IdColorOutSideNavigation")]
    public virtual ICollection<Car> CarIdColorOutSideNavigations { get; set; } = new List<Car>();
}
