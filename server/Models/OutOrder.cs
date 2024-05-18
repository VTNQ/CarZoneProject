using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("OutOrder")]
public partial class OutOrder
{
    [Key]
    public int Id { get; set; }

    public int IdCustomer { get; set; }

    public int IdShowroom { get; set; }

    public int IdEmployee { get; set; }

    public DateOnly DateOfSale { get; set; }

    [Column(TypeName = "money")]
    public decimal TotalAmount { get; set; }

    [Column(TypeName = "money")]
    public decimal TotalTax { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string Payment { get; set; } = null!;

    [Required]
    public bool? Status { get; set; }

    [StringLength(30)]
    [Unicode(false)]
    public string DeliveryType { get; set; } = null!;

    [InverseProperty("IdOrderNavigation")]
    public virtual ICollection<Contract> Contracts { get; set; } = new List<Contract>();

    [InverseProperty("IdOrderNavigation")]
    public virtual ICollection<DetailOfOutOrder> DetailOfOutOrders { get; set; } = new List<DetailOfOutOrder>();

    [ForeignKey("IdCustomer")]
    [InverseProperty("OutOrders")]
    public virtual Customer IdCustomerNavigation { get; set; } = null!;

    [ForeignKey("IdEmployee")]
    [InverseProperty("OutOrders")]
    public virtual Employee IdEmployeeNavigation { get; set; } = null!;

    [ForeignKey("IdShowroom")]
    [InverseProperty("OutOrders")]
    public virtual Showroom IdShowroomNavigation { get; set; } = null!;

    [InverseProperty("IdOrderNavigation")]
    public virtual ICollection<InVoice> InVoices { get; set; } = new List<InVoice>();
}
