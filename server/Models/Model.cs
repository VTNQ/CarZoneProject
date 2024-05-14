using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Model")]
public partial class Model
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    public int IdBrand { get; set; }

    [InverseProperty("IdModelNavigation")]
    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();

    [ForeignKey("IdBrand")]
    [InverseProperty("Models")]
    public virtual Brand IdBrandNavigation { get; set; } = null!;
}
