using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

[Table("Customer")]
public partial class Customer
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string FullName { get; set; } = null!;

    [Column("DOB")]
    public DateOnly Dob { get; set; }

    [StringLength(30)]
    [Unicode(false)]
    public string Phone { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [StringLength(200)]
    [Unicode(false)]
    public string Address { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string IndentityCode { get; set; } = null!;

    [StringLength(200)]
    [Unicode(false)]
    public string Sign { get; set; } = null!;

    [InverseProperty("IdCustomerNavigation")]
    public virtual ICollection<OutOrder> OutOrders { get; set; } = new List<OutOrder>();
}
