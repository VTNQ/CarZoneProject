using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("DetailOfOutOrder")]
public partial class DetailOfOutOrder
{
    [Key]
    public int Id { get; set; }

    public int IdCar { get; set; }

    public int IdOrder { get; set; }

    public DateOnly DeliveryDay { get; set; }

    [Column(TypeName = "money")]
    public decimal Price { get; set; }

    [Column(TypeName = "money")]
    public decimal Tax { get; set; }

    [ForeignKey("IdCar")]
    [InverseProperty("DetailOfOutOrders")]
    public virtual Car IdCarNavigation { get; set; } = null!;

    [ForeignKey("IdOrder")]
    [InverseProperty("DetailOfOutOrders")]
    public virtual OutOrder IdOrderNavigation { get; set; } = null!;
}
