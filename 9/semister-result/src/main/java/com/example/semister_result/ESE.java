package com.example.semister_result;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ESE")
public class ESE {
    @Id
    private String prn;
    private float subject1;
    private float subject2;
    private float subject3;
    private float subject4;

    public String getPrn() { return prn; }
    public void setPrn(String prn) { this.prn = prn; }
    public float getSubject1() { return subject1; }
    public void setSubject1(float subject1) { this.subject1 = subject1; }
    public float getSubject2() { return subject2; }
    public void setSubject2(float subject2) { this.subject2 = subject2; }
    public float getSubject3() { return subject3; }
    public void setSubject3(float subject3) { this.subject3 = subject3; }
    public float getSubject4() { return subject4; }
    public void setSubject4(float subject4) { this.subject4 = subject4; }
}
