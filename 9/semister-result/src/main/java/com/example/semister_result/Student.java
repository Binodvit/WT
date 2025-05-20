package com.example.semister_result;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Students")
public class Student {
    @Id
    private String prn;
    private String name;
    private String branch;

    public String getPrn() { return prn; }
    public void setPrn(String prn) { this.prn = prn; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
}
