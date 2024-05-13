using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Keyless]
[Table("DetailOfInOrder")]
public partial class DetailOfInOrder
{
    public int IdCar { get; set; }

    public int IdOrder { get; set; }

    public DateOnly DeliveryDate { get; set; }

    [Column(TypeName = "money")]
    public decimal Price { get; set; }

    [Column(TypeName = "money")]
    public decimal Tax { get; set; }

    [ForeignKey("IdCar")]
    public virtual Car IdCarNavigation { get; set; } = null!;

    [ForeignKey("IdOrder")]
    public virtual InOrder IdOrderNavigation { get; set; } = null!;
}
