using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

public partial class DatabaseContext : DbContext
{
    public DatabaseContext()
    {
    }

    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<Car> Cars { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<Color> Colors { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<Contract> Contracts { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<DetailOfInOrder> DetailOfInOrders { get; set; }

    public virtual DbSet<DetailOfOutOrder> DetailOfOutOrders { get; set; }

    public virtual DbSet<District> Districts { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Form> Forms { get; set; }

    public virtual DbSet<InOrder> InOrders { get; set; }

    public virtual DbSet<InVoice> InVoices { get; set; }

    public virtual DbSet<Model> Models { get; set; }

    public virtual DbSet<OutOrder> OutOrders { get; set; }

    public virtual DbSet<Photo> Photos { get; set; }

    public virtual DbSet<Request> Requests { get; set; }

    public virtual DbSet<Showroom> Showrooms { get; set; }

    public virtual DbSet<SubWarehouseCar> SubWarehouseCars { get; set; }

    public virtual DbSet<SubWarehouseShowroom> SubWarehouseShowrooms { get; set; }

    public virtual DbSet<Suplier> Supliers { get; set; }

    public virtual DbSet<Version> Versions { get; set; }

    public virtual DbSet<Warehouse> Warehouses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=tcp:carzone.database.windows.net,1433;Initial Catalog=CarZone;Persist Security Info=False;User ID=root130504;Password=Carzone13052004;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Brand__3214EC0753C3301F");

            entity.Property(e => e.Headquarters).HasDefaultValue("");
            entity.Property(e => e.Logo).HasDefaultValue("");
            entity.Property(e => e.Name).HasDefaultValue("");

            entity.HasOne(d => d.IdCountryNavigation).WithMany(p => p.Brands)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_brand_country");
        });

        modelBuilder.Entity<Car>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Car__3214EC079842DFC4");

            entity.Property(e => e.Bhp).HasDefaultValue("0");
            entity.Property(e => e.Condition).HasDefaultValue("0");
            entity.Property(e => e.DateAccept).HasDefaultValueSql("('')");
            entity.Property(e => e.Drivertrain).HasDefaultValue("0");
            entity.Property(e => e.Engine).HasDefaultValue("0");
            entity.Property(e => e.FuelConsumption).HasDefaultValue("0");
            entity.Property(e => e.FuelType).HasDefaultValue("0");
            entity.Property(e => e.MotorSize).HasDefaultValue("0");
            entity.Property(e => e.Name).HasDefaultValue("");
            entity.Property(e => e.Transmission).HasDefaultValue("0");

            entity.HasOne(d => d.IdColorInSideNavigation).WithMany(p => p.CarIdColorInSideNavigations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_car_color2");

            entity.HasOne(d => d.IdColorOutSideNavigation).WithMany(p => p.CarIdColorOutSideNavigations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_car_color1");

            entity.HasOne(d => d.IdFormNavigation).WithMany(p => p.Cars)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_car_form");

            entity.HasOne(d => d.IdModelNavigation).WithMany(p => p.Cars)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_car_model");

            entity.HasOne(d => d.IdVersionNavigation).WithMany(p => p.Cars)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_car_version");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__City__3214EC07F5FB6C18");

            entity.Property(e => e.IsDelete)
                .HasDefaultValueSql("('0')")
                .HasComment("");
            entity.Property(e => e.Name).HasDefaultValue("");

            entity.HasOne(d => d.IdCountryNavigation).WithMany(p => p.Cities)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_city_country");
        });

        modelBuilder.Entity<Color>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Color__3214EC074B8549DC");

            entity.Property(e => e.Name).HasDefaultValue("");
        });

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Contact__3214EC076E469DA0");

            entity.Property(e => e.EmailCustomer).HasDefaultValue("");
            entity.Property(e => e.NameCustomer).HasDefaultValue("");
        });

        modelBuilder.Entity<Contract>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Contract__3214EC077F57D72F");

            entity.Property(e => e.Condition).HasDefaultValueSql("(NULL)");
            entity.Property(e => e.CreatedDate).HasDefaultValueSql("(NULL)");

            entity.HasOne(d => d.IdOrderNavigation).WithMany(p => p.Contracts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Contract_Outorder");
        });

        modelBuilder.Entity<Country>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Country__3214EC07CE1981A7");

            entity.Property(e => e.IsDelete)
                .HasDefaultValueSql("('0')")
                .HasComment("");
            entity.Property(e => e.Name).HasDefaultValue("");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Customer__3214EC07F379D774");

            entity.Property(e => e.Address).HasDefaultValue("");
            entity.Property(e => e.Dob).HasDefaultValueSql("('')");
            entity.Property(e => e.Email).HasDefaultValue("");
            entity.Property(e => e.FullName).HasDefaultValue("");
            entity.Property(e => e.IndentityCode).HasDefaultValue("");
            entity.Property(e => e.Phone).HasDefaultValue("");
            entity.Property(e => e.Sign).HasDefaultValue("");
        });

        modelBuilder.Entity<DetailOfInOrder>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DetailOf__3214EC07774E73CC");

            entity.Property(e => e.Id).HasComment("");

            entity.HasOne(d => d.IdCarNavigation).WithMany(p => p.DetailOfInOrders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_detail_car");

            entity.HasOne(d => d.IdOrderNavigation).WithMany(p => p.DetailOfInOrders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_detail_inorder");
        });

        modelBuilder.Entity<DetailOfOutOrder>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DetailOf__3214EC07B2B73CC7");

            entity.HasOne(d => d.IdCarNavigation).WithMany(p => p.DetailOfOutOrders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DetailOut_Car");

            entity.HasOne(d => d.IdOrderNavigation).WithMany(p => p.DetailOfOutOrders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DetailOut_Outorder");
        });

        modelBuilder.Entity<District>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__District__3214EC0724EE77EE");

            entity.Property(e => e.IsDelete)
                .HasDefaultValueSql("('0')")
                .HasComment("");
            entity.Property(e => e.Name).HasDefaultValue("");

            entity.HasOne(d => d.IdCityNavigation).WithMany(p => p.Districts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_district_city");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC07233F6931");

            entity.Property(e => e.Address).HasDefaultValue("");
            entity.Property(e => e.Email).HasDefaultValue("");
            entity.Property(e => e.FullName).HasDefaultValue("");
            entity.Property(e => e.IdShowroom).HasDefaultValue(0);
            entity.Property(e => e.IdentityCode).HasDefaultValue("");
            entity.Property(e => e.Password).HasDefaultValue("");
            entity.Property(e => e.Phone).HasDefaultValue("");
            entity.Property(e => e.Role).HasDefaultValue("");
        });

        modelBuilder.Entity<Form>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Form__3214EC07326FB17D");

            entity.Property(e => e.Name).HasDefaultValue("");
        });

        modelBuilder.Entity<InOrder>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__InOrder__3214EC07B8BDA2B0");

            entity.Property(e => e.DateOfSale).HasDefaultValueSql("('')");

            entity.HasOne(d => d.IdEmployeeNavigation).WithMany(p => p.InOrders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_inorder_employee");

            entity.HasOne(d => d.IdShowroomNavigation).WithMany(p => p.InOrders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_inorder_showroom");

            entity.HasOne(d => d.IdWarehouseNavigation).WithMany(p => p.InOrders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_inorder_warehouse");
        });

        modelBuilder.Entity<InVoice>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Invoice__3214EC0731FC790E");

            entity.HasOne(d => d.IdOrderNavigation).WithMany(p => p.InVoices)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Invoice_OutOrder");
        });

        modelBuilder.Entity<Model>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Model__3214EC07DD5DE9EA");

            entity.Property(e => e.Name).HasDefaultValue("");

            entity.HasOne(d => d.IdBrandNavigation).WithMany(p => p.Models)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_model_brand");
        });

        modelBuilder.Entity<OutOrder>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__OutOrder__3214EC07DCC45F7E");

            entity.Property(e => e.DeliveryType).HasDefaultValue("0");
            entity.Property(e => e.Payment).HasDefaultValue("0");
            entity.Property(e => e.Status).HasDefaultValueSql("('0')");

            entity.HasOne(d => d.IdCustomerNavigation).WithMany(p => p.OutOrders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Outorder_customer");

            entity.HasOne(d => d.IdEmployeeNavigation).WithMany(p => p.OutOrders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK3_Outorder_Employee");

            entity.HasOne(d => d.IdShowroomNavigation).WithMany(p => p.OutOrders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Outorder_Showroom");
        });

        modelBuilder.Entity<Photo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Photo__3214EC078DAA9789");

            entity.Property(e => e.Link).HasDefaultValue("");

            entity.HasOne(d => d.IdCarNavigation).WithMany(p => p.Photos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_photo_car");
        });

        modelBuilder.Entity<Request>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Request__3214EC073E99BA52");

            entity.Property(e => e.Description).HasComment("");
            entity.Property(e => e.From).HasDefaultValue("");
            entity.Property(e => e.To).HasDefaultValue("");
        });

        modelBuilder.Entity<Showroom>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Showroom__3214EC074AF29314");

            entity.Property(e => e.Name).HasDefaultValue("");

            entity.HasOne(d => d.IdDistrictNavigation).WithMany(p => p.Showrooms)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_showroom_district");
        });

        modelBuilder.Entity<SubWarehouseCar>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SubWareh__3214EC075576B9A7");

            entity.HasOne(d => d.IdCarNavigation).WithMany(p => p.SubWarehouseCars)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WarehouseCar_Car");

            entity.HasOne(d => d.IdWarehouseNavigation).WithMany(p => p.SubWarehouseCars)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_WarehouseCar_Warehouse");
        });

        modelBuilder.Entity<SubWarehouseShowroom>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SubWareh__3214EC07A09E6DDD");

            entity.HasOne(d => d.IdCarNavigation).WithMany(p => p.SubWarehouseShowrooms)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubWarehouse_Car");

            entity.HasOne(d => d.IdShowroomNavigation).WithMany(p => p.SubWarehouseShowrooms)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubWarehouse_Showroom");
        });

        modelBuilder.Entity<Suplier>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Suplier__3214EC070B9BBC3B");

            entity.Property(e => e.Email)
                .HasDefaultValue("''0''")
                .HasComment("");
            entity.Property(e => e.Name).HasDefaultValue("");
            entity.Property(e => e.Type).HasDefaultValue("0");

            entity.HasOne(d => d.IdCountryNavigation).WithMany(p => p.Supliers)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_suplier_country");
        });

        modelBuilder.Entity<Version>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Version__3214EC07A5B61E8B");

            entity.Property(e => e.ReleaseYear).HasDefaultValue("");
        });

        modelBuilder.Entity<Warehouse>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Warehous__3214EC073869743D");

            entity.Property(e => e.Name).HasDefaultValue("");

            entity.HasOne(d => d.IdCountryNavigation).WithMany(p => p.Warehouses)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_warehouse_country");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
