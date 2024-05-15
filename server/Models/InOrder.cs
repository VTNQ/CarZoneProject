﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("InOrder")]
public partial class InOrder
{
    [Key]
    public int Id { get; set; }

    public int IdWarehouse { get; set; }

    public int IdEmployee { get; set; }

    public int IdSuplier { get; set; }

    public DateOnly DateOfSale { get; set; }

    [Column(TypeName = "money")]
    public decimal TotalAmount { get; set; }

    [Column(TypeName = "money")]
    public decimal TotalTax { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string Payment { get; set; } = null!;

    public bool Status { get; set; }

    [ForeignKey("IdEmployee")]
    [InverseProperty("InOrders")]
    public virtual Employee IdEmployeeNavigation { get; set; } = null!;

    [ForeignKey("IdSuplier")]
    [InverseProperty("InOrders")]
    public virtual Suplier IdSuplierNavigation { get; set; } = null!;

    [ForeignKey("IdWarehouse")]
    [InverseProperty("InOrders")]
    public virtual Warehouse IdWarehouseNavigation { get; set; } = null!;
}