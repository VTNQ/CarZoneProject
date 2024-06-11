using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("DetailOfInOrder")]
public partial class DetailOfInOrder
{
    [Key]
    public int Id { get; set; }

    public int IdCar { get; set; }

    public int IdOrder { get; set; }

    public DateOnly DeliveryDate { get; set; }

    [ForeignKey("IdCar")]
    [InverseProperty("DetailOfInOrders")]
    public virtual Car IdCarNavigation { get; set; } = null!;

    [ForeignKey("IdOrder")]
    [InverseProperty("DetailOfInOrders")]
    public virtual InOrder IdOrderNavigation { get; set; } = null!;
}
