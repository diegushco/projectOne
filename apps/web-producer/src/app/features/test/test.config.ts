/**
 * Mock class, to change the values ​​for the tests being used
 * try to change the values ​​from the tests and not from the class
 */
export class TestClass {
  mockStore: any = {
    policy: {
      origincode: '124',
      job: {
        number: '0001006215',
        type: 'Submission'
      },
      policynumber: null,
      email: null,
      period: {
        start: '2026-08-30T00:01:00Z',
        end: '2026-11-30T00:01:00Z',
        method: 'Sura_ThreeMonths'
      },
      fiscalcondition: 'consumidorFinal',
      paymentTerm: {
        code: 'pp:06',
        description: '3 Cuotas - ARS',
        maximumnumberofinstallments: 3
      },
      periodMethod: {
        code: 'Sura_ThreeMonths',
        description: '3 meses'
      },
      officialid: 'SSN',
      premiumcurrency: 'ars',
      coveragecurrency: 'ars',
      iibb: {
        type: null,
        number: null
      },
      producer: {
        code: 234
      },
      payment: {
        method: 'CreditCard',
        id: null,
        plan: {
          code: 'pp:06'
        },
        cbu: {
          number: null,
          alias: null,
          conduit: '17'
        },
        creditcard: {
          type: null,
          number: null,
          expirationdate: null
        }
      },
      campaign: null,
      productcode: 'CA7CommAuto',
      motor: {
        fleet: 'Fleet',
        vehicles: [
          {
            id: 1,
            license: null,
            chasis: null,
            motor: null,
            year: 2018,
            use: 3,
            activity: 'AC_99',
            destination: 1,
            gnc: false,
            gps: false,
            group: 'AUTO',
            packages: [
              {
                externalid: '1_A',
                code: 'A',
                description: 'RC',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        description: 'Cláusula de Ajuste (%)',
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ]
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        description: 'Proveedor',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSBasic'
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'RC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '1_B1',
                code: 'B1',
                description: 'B1',
                selected: false,
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        description: 'Cláusula de Ajuste (%)',
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ]
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        description: 'Proveedor',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '1_B',
                code: 'B',
                description: 'B',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        description: 'Cláusula de Ajuste (%)',
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ]
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        description: 'Proveedor',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                selected: false,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '1_C1',
                code: 'C1',
                description: 'C1',
                selected: true,
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '1_C',
                code: 'C',
                selected: false,
                description: 'C',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '1_CPrem',
                code: 'CPrem',
                selected: false,
                description: 'C Premium',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '5000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '10000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '5000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '10000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '1_CClima',
                code: 'CClima',
                description: 'C Clima',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '100000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorGranizoFullValueCov',
                      description: 'Daño por Granizo Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosPorGranizoFullValueLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorInundFullValueCov',
                      description: 'Daños por Inundación Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosporInundacionFullValueLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '100000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorGranizoFullValueCov',
                      description: 'Daño por Granizo Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosPorGranizoFullValueLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorInundFullValueCov',
                      description: 'Daños por Inundación Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosporInundacionFullValueLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '1075000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                selected: false,
                costs: null,
                group: 'TC'
              },
              {
                externalid:
                  '1_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                description: 'Fcia. Fija $10.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        description: 'Cláusula de Ajuste (%)',
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ]
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        description: 'Proveedor',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '1_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                description: 'Fcia. Fija $15.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        description: 'Cláusula de Ajuste (%)',
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ]
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        description: 'Proveedor',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '1_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                description: 'Fcia. Fija $20.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        description: 'Cláusula de Ajuste (%)',
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ]
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        description: 'Proveedor',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '1_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                description: 'Fcia. Fija $30.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        description: 'Cláusula de Ajuste (%)',
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ]
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        description: 'Proveedor',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '1_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                description: 'Fcia. Variable 2%',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        description: 'Cláusula de Ajuste (%)',
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ]
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        description: 'Proveedor',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '1_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                description: 'Fcia. Variable 3%',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        description: 'Cláusula de Ajuste (%)',
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ]
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        description: 'Proveedor',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '1_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                description: 'Fcia. Variable 6%',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        description: 'Cláusula de Ajuste (%)',
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ]
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        description: 'Proveedor',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                selected: false,
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              }
            ],
            brand: {
              code: 18,
              description: 'FORD'
            },
            statedamount: 1075000,
            model: {
              code: 698,
              year: null,
              description: 'FORD ECO SPORT 1.5 FREESTYLE L/18',
              statementamount: 1075000,
              originalcostnew: 1075000,
              type: 'Auto'
            },
            zone: {
              city: 'CIUDAD AUTONOMA BUENOS AIRES',
              postalcode: '1001',
              state: 'AR_23'
            },
            garage: null,
            kmstraveled: null,
            useName: 'PARTICULAR',
            number: 1,
            driver: {
              firstname: null,
              lastname: null,
              birth: null,
              gender: null,
              clientIsDriver: true
            },
            bondholder: {
              finish: null,
              firstinstallmentdue: null,
              number: null,
              quotas: null,
              start: null,
              type: null
            },
            zerokm: false,
            shortModel: 'ECO SPORT',
            blacklist: false,
            patentInUse: false,
            added: true
          },
          {
            id: 2,
            license: null,
            chasis: null,
            motor: null,
            year: 2017,
            use: 3,
            activity: 'AC_99',
            destination: 1,
            gnc: false,
            gps: false,
            group: 'AUTO',
            packages: [
              {
                externalid: '2_A',
                code: 'A',
                description: 'RC',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSBasic'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'RC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '2_B1',
                code: 'B1',
                description: 'B1',
                selected: false,
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '2_B',
                code: 'B',
                description: 'B',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                selected: false,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '2_C1',
                code: 'C1',
                description: 'C1',
                selected: false,
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '2_C',
                code: 'C',
                selected: true,
                description: 'C',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '2_CPrem',
                code: 'CPrem',
                selected: false,
                description: 'C Premium',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '5000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '10000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '5000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '10000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '2_CClima',
                code: 'CClima',
                description: 'C Clima',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '100000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorGranizoFullValueCov',
                      description: 'Daño por Granizo Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosPorGranizoFullValueLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorInundFullValueCov',
                      description: 'Daños por Inundación Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosporInundacionFullValueLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '100000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorGranizoFullValueCov',
                      description: 'Daño por Granizo Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosPorGranizoFullValueLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorInundFullValueCov',
                      description: 'Daños por Inundación Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosporInundacionFullValueLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '443000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                selected: false,
                costs: null,
                group: 'TC'
              },
              {
                externalid:
                  '2_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                description: 'Fcia. Fija $10.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '2_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                description: 'Fcia. Fija $15.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '2_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                description: 'Fcia. Fija $20.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '2_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                description: 'Fcia. Fija $30.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '2_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                description: 'Fcia. Variable 2%',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '2_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                description: 'Fcia. Variable 3%',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '2_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                description: 'Fcia. Variable 6%',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                selected: false,
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              }
            ],
            brand: {
              code: 18,
              description: 'FORD'
            },
            statedamount: 443000,
            model: {
              code: 527,
              year: null,
              description: 'FORD FIESTA 1.6 4 PTAS ONE MAX EDGE PLU',
              statementamount: 443000,
              originalcostnew: 443000,
              type: 'Auto'
            },
            zone: {
              city: 'CIUDAD AUTONOMA BUENOS AIRES',
              postalcode: '1001',
              state: 'AR_23'
            },
            garage: null,
            kmstraveled: null,
            useName: 'PARTICULAR',
            number: 2,
            driver: {
              firstname: null,
              lastname: null,
              birth: null,
              gender: null,
              clientIsDriver: true
            },
            bondholder: {
              finish: null,
              firstinstallmentdue: null,
              number: null,
              quotas: null,
              start: null,
              type: null
            },
            zerokm: false,
            shortModel: 'FIESTA',
            blacklist: false,
            patentInUse: false,
            added: true
          },
          {
            id: 3,
            license: null,
            chasis: null,
            motor: null,
            year: 2016,
            use: 3,
            activity: 'AC_99',
            destination: 1,
            gnc: false,
            gps: false,
            group: 'AUTO',
            packages: [
              {
                externalid: '3_A',
                code: 'A',
                description: 'RC',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSBasic'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'RC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '3_B1',
                code: 'B1',
                description: 'B1',
                selected: false,
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSBasic'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '3_B',
                code: 'B',
                description: 'B',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSBasic'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                selected: false,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '3_C1',
                code: 'C1',
                description: 'C1',
                selected: false,
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSBasic'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSBasic'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '3_C',
                code: 'C',
                selected: false,
                description: 'C',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSBasic'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSBasic'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '3_CPrem',
                code: 'CPrem',
                selected: true,
                description: 'C Premium',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '5000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '10000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSBasic'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '5000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '10000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSBasic'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '3_CClima',
                code: 'CClima',
                description: 'C Clima',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '100000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorGranizoFullValueCov',
                      description: 'Daño por Granizo Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosPorGranizoFullValueLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorInundFullValueCov',
                      description: 'Daños por Inundación Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosporInundacionFullValueLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSBasic'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '100000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorGranizoFullValueCov',
                      description: 'Daño por Granizo Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosPorGranizoFullValueLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorInundFullValueCov',
                      description: 'Daños por Inundación Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosporInundacionFullValueLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '426000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSBasic'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                selected: false,
                costs: null,
                group: 'TC'
              },
              {
                externalid:
                  '3_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                description: 'Fcia. Fija $10.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSBasic'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '3_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                description: 'Fcia. Fija $15.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSBasic'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '3_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                description: 'Fcia. Fija $20.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSBasic'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '3_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                description: 'Fcia. Fija $30.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSBasic'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '3_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                description: 'Fcia. Variable 2%',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSBasic'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '3_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                description: 'Fcia. Variable 3%',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSBasic'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '3_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                description: 'Fcia. Variable 6%',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSBasic'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                selected: false,
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              }
            ],
            brand: {
              code: 12,
              description: 'CHEVROLET'
            },
            statedamount: 426000,
            model: {
              code: 424,
              year: null,
              description: 'CHEVROLET AGILE 1.4 5 PTAS LS SPIRIT',
              statementamount: 426000,
              originalcostnew: 426000,
              type: 'Auto'
            },
            zone: {
              city: 'CIUDAD AUTONOMA BUENOS AIRES',
              postalcode: '1001',
              state: 'AR_23'
            },
            garage: null,
            kmstraveled: null,
            useName: 'PARTICULAR',
            number: 3,
            driver: {
              firstname: null,
              lastname: null,
              birth: null,
              gender: null,
              clientIsDriver: true
            },
            bondholder: {
              finish: null,
              firstinstallmentdue: null,
              number: null,
              quotas: null,
              start: null,
              type: null
            },
            zerokm: false,
            shortModel: 'AGILE',
            blacklist: false,
            patentInUse: false,
            added: true
          },
          {
            id: 4,
            license: null,
            chasis: null,
            motor: null,
            year: 2017,
            use: 3,
            activity: 'AC_99',
            destination: 1,
            gnc: false,
            gps: false,
            group: 'AUTO',
            packages: [
              {
                externalid: '4_A',
                code: 'A',
                description: 'RC',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSBasic'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                costs: null,
                group: 'RC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '4_B1',
                code: 'B1',
                description: 'B1',
                selected: false,
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                costs: null,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '4_B',
                code: 'B',
                description: 'B',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                costs: null,
                selected: false,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '4_C1',
                code: 'C1',
                description: 'C1',
                selected: false,
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '4_C',
                code: 'C',
                selected: false,
                description: 'C',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesCov',
                      description: 'Daños a Cristales Laterales'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoCristalesLateralescomoAddLim',
                        value: {
                          current: 'Un evento año calendario'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '4_CPrem',
                code: 'CPrem',
                selected: false,
                description: 'C Premium',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '5000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '10000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '5000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '10000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '4_CClima',
                code: 'CClima',
                description: 'C Clima',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '100000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorGranizoFullValueCov',
                      description: 'Daño por Granizo Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosPorGranizoFullValueLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorInundFullValueCov',
                      description: 'Daños por Inundación Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosporInundacionFullValueLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                coveragesQuoted: [
                  {
                    pattern: {
                      code: 'SURA_CA7_RespCivilCov',
                      description: 'Responsabilidad Civil '
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeResponsabilidadCivilLim',
                        value: {
                          current: '10000000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboTotalCov',
                      description: 'Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioTotalCov',
                      description: 'Incendio Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoTotalCov',
                      description: 'Daño total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeDanoTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_RoboParcialCov',
                      description: 'Robo Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeRoboParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_IncendioParcialCov',
                      description: 'Incendio Parcial'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_CoberturadeIncendioParcialLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DPalAmparoDelRTCov',
                      description: 'Daño Parcial  al amparo del Robo Total'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanoParcialalamparodelRoboTotalLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_MuerteAccidenteConductorCov',
                      description: 'Muerte Accidental Conductor'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_MuerteAccidentalConductorLim',
                        value: {
                          current: '100000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ParabrisasyLunetasBenCov',
                      description: 'Daños a Parabrisas y Lunetas Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaParabrisasyLunetasLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CristalesLateralesBenCov',
                      description: 'Daños a Cristales Laterales Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCristalesLateralesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_CerradurasBenCov',
                      description: 'Daños a Cerraduras'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosaCerradurasLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorGranizoFullValueCov',
                      description: 'Daño por Granizo Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosPorGranizoFullValueLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobMandatoriaGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        value: {
                          current: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_CobAdicionalesGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_DanoPorInundFullValueCov',
                      description: 'Daños por Inundación Full Value'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_DanosporInundacionFullValueLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionAPaisesLimCov',
                      description: 'Extensión RC a Países Limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaPaisesLimitrofesLim',
                        value: {
                          current: '300000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesCov',
                      description: 'Extensión Robo a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaRoboPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesCov',
                      description: 'Extensión Incendio a Países limítrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaIncendioPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesCov',
                      description: 'Extensión Daños a Paises limitrofes'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ExtensionaDanoPaisesLimitrofesLim',
                        value: {
                          current: '462000.0000'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_BeneficiosGrp'
                    }
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        value: {
                          current: 'SOSPremium'
                        }
                      }
                    ],
                    category: {
                      code: 'SURA_CA7_AsistenciasGrp'
                    }
                  }
                ],
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                selected: true,
                costs: null,
                group: 'TC'
              },
              {
                externalid:
                  '4_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                description: 'Fcia. Fija $10.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '4_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                description: 'Fcia. Fija $15.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '4_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                description: 'Fcia. Fija $20.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '4_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                description: 'Fcia. Fija $30.000',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '4_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                description: 'Fcia. Variable 2%',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '4_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                description: 'Fcia. Variable 3%',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '4_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                description: 'Fcia. Variable 6%',
                coverages: [
                  {
                    pattern: {
                      code: 'SURA_CA7_AsistenciaMecanicaCov',
                      description: 'Asistencia Mecánica'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                        options: [
                          {
                            code: 'SOSBasic',
                            description: 'SOS Básica'
                          },
                          {
                            code: 'SOSPremium',
                            description: 'SOS Premium'
                          },
                          {
                            code: 'NoAssistance',
                            description: 'Sin Asistencia'
                          }
                        ],
                        value: 'SOSPremium'
                      }
                    ]
                  },
                  {
                    pattern: {
                      code: 'SURA_CA7_ClausulaDeAjusteCov',
                      description: 'Cláusula de Ajuste'
                    },
                    terms: [
                      {
                        code: 'SURA_CA7_ClausulaDeAjusteLim',
                        options: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                            description: '0'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            description: '10'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                            description: '15'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                            description: '20'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                            description: '30'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                            description: '40'
                          },
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                            description: '50'
                          }
                        ],
                        value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                      }
                    ]
                  }
                ],
                selected: false,
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4723.35,
                  assistance: 322.63,
                  total: 5906.4
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              }
            ],
            brand: {
              code: 12,
              description: 'CHEVROLET'
            },
            statedamount: 462000,
            model: {
              code: 410,
              year: null,
              description: 'CHEVROLET AVEO 1.6 LS G3',
              statementamount: 462000,
              originalcostnew: 462000,
              type: 'Auto'
            },
            zone: {
              city: 'CIUDAD AUTONOMA BUENOS AIRES',
              postalcode: '1001',
              state: 'AR_23'
            },
            garage: null,
            kmstraveled: null,
            useName: 'PARTICULAR',
            number: 4,
            driver: {
              firstname: null,
              lastname: null,
              birth: null,
              gender: null,
              clientIsDriver: true
            },
            bondholder: {
              finish: null,
              firstinstallmentdue: null,
              number: null,
              quotas: null,
              start: null,
              type: null
            },
            zerokm: false,
            shortModel: 'AVEO',
            blacklist: false,
            patentInUse: false,
            added: true
          }
        ],
        commission: 18,
        discounts: [
          {
            code: 'SuraCA7_ExternalComercialDiscount',
            minimum: 0,
            maximum: 10,
            value: 0
          }
        ],
        costs: [
          {
            externalId: '1,C1&2,C&3,CPrem&4,CClima',
            financial: 2967.29,
            internaltax: 32.64,
            administrativecharge: 3703.71,
            socialservice: 163.2,
            ssnrate: 522.24,
            vialrate: 326.4,
            submissionfee: 175,
            iva: {
              total: 6854.43,
              comun: 6854.43,
              gc: 0
            },
            basetaxes: 32640.14,
            sellado: {
              total: 0,
              base: 0
            },
            discount: 0,
            invoice: 13404.216666666667,
            commission: 4444.45,
            total: 40212.65
          }
        ]
      },
      client: {
        accountnumber: null,
        addresses: null,
        cellphone: {
          area: null,
          number: null
        },
        homephone: null,
        primaryaddress: null,
        birth: null,
        documentNumber: null,
        documentType: null,
        firstname: null,
        gender: null,
        fiscalcondition: 'consumidorFinal',
        iibb: {
          type: null,
          number: null
        },
        politicallyexposed: null,
        lastname: null,
        maritalstatus: null,
        consortium: null,
        officialorganism: null,
        companyname: null,
        contactid: null,
        officialids: null,
        type: null,
        address: {
          apartment: null,
          city: null,
          floor: null,
          id: null,
          postalcode: null,
          state: null,
          street: null,
          streetnumber: null,
          type: null,
          clarification: null
        },
        email: null,
        nationality: null,
        certificate: {
          start: null,
          end: null
        },
        blacklist: false,
        editable: false
      },
      shortModel: null,
      insured: {
        accountnumber: null,
        addresses: null,
        cellphone: {
          area: null,
          number: null
        },
        homephone: null,
        primaryaddress: null,
        birth: null,
        documentNumber: null,
        documentType: null,
        firstname: null,
        gender: null,
        fiscalcondition: 'consumidorFinal',
        iibb: {
          type: null,
          number: null
        },
        politicallyexposed: null,
        lastname: null,
        maritalstatus: null,
        consortium: null,
        officialorganism: null,
        companyname: null,
        contactid: null,
        officialids: null,
        type: 'Person',
        address: {
          apartment: null,
          city: 'CIUDAD AUTONOMA BUENOS AIRES',
          floor: null,
          id: null,
          postalcode: null,
          state: 'AR_23',
          street: null,
          streetnumber: null,
          type: null,
          clarification: null
        },
        email: null,
        nationality: null,
        certificate: {
          start: null,
          end: null
        },
        blacklist: false,
        editable: false
      },
      inspection: {
        autogenerate: false,
        id: null,
        phone: {
          number: null
        },
        status: null
      }
    },
    quote: {
      motor: {
        activeMotor: 4,
        routes: [
          {
            path: 'motor/4/patent',
            question: '¿Sabes la patente del vehiculo?',
            show: true,
            disabled: false,
            car: '4',
            value: 'Pendiente',
            shortName: 'Patente',
            visible: true
          },
          {
            path: 'motor/4/year',
            question: '¿Cuál es el año del vehiculo?',
            show: true,
            disabled: false,
            car: '4',
            value: '2017 ',
            shortName: 'Año',
            visible: true
          },
          {
            path: 'motor/4/brand',
            question: '¿Cual es la marca?',
            show: true,
            disabled: false,
            car: '4',
            value: 'CHEVROLET',
            shortName: 'Marca',
            visible: true
          },
          {
            path: 'motor/4/model',
            question: '¿Cual es el modelo?',
            show: true,
            disabled: false,
            car: '4',
            value: 'AVEO',
            shortName: 'Modelo',
            visible: true
          },
          {
            path: 'motor/4/version',
            question: '¿Cual es la version?',
            show: true,
            disabled: false,
            car: '4',
            value: 'CHEVROLET AVEO 1.6 LS G3',
            shortName: 'Version',
            visible: true
          },
          {
            path: 'motor/4/location',
            question: '¿Cual es la ubicacion del vehiculo?',
            show: true,
            disabled: false,
            car: '4',
            value: 'CAPITAL, CIUDAD AUTONOMA BUENOS AIRES',
            shortName: 'Ubicacion',
            visible: true
          },
          {
            path: 'motor/4/use',
            question: '¿Cuál es el uso y destino?',
            show: true,
            disabled: false,
            car: '4',
            value: 'PARTICULAR',
            shortName: 'Uso',
            visible: true
          },
          {
            path: 'motor/4/sum',
            question: '¿Estas de acuerdo con la suma asegurada?',
            show: true,
            disabled: true,
            car: '4',
            value: '$ 462.000',
            shortName: 'Suma Asegurada',
            visible: true
          },
          {
            path: 'motor/4/age',
            question: '¿Cúal es la edad del conductor?',
            show: true,
            disabled: true,
            car: '4',
            value: '',
            shortName: 'Edad del conductor',
            visible: false
          }
        ],
        activeRoute: 'motor/4/sum',
        coverageResponse: [
          {
            job: {
              number: '0001006215'
            },
            period: {
              start: '2026-08-30T00:01:00Z',
              end: '2026-11-30T00:01:00Z',
              method: 'Sura_ThreeMonths'
            },
            motor: {
              vehicles: [
                {
                  number: 1,
                  use: 3,
                  destination: 1,
                  activity: 'AC_99',
                  package: {
                    coverages: [
                      {
                        pattern: {
                          code: 'SURA_CA7_ClausulaDeAjusteCov',
                          description: 'Cláusula de Ajuste'
                        },
                        terms: [
                          {
                            code: 'SURA_CA7_ClausulaDeAjusteLim',
                            description: 'Cláusula de Ajuste (%)',
                            value: 'SURA_CA7_ClausulaDeAjusteOpt2',
                            options: [
                              {
                                code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                                description: '0'
                              },
                              {
                                code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                                description: '10'
                              },
                              {
                                code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                                description: '15'
                              },
                              {
                                code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                                description: '20'
                              },
                              {
                                code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                                description: '30'
                              },
                              {
                                code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                                description: '40'
                              },
                              {
                                code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                                description: '50'
                              }
                            ]
                          }
                        ],
                        category: {
                          code: 'SURA_CA7_CobAdicionalesGrp'
                        }
                      },
                      {
                        pattern: {
                          code: 'SURA_CA7_AsistenciaMecanicaCov',
                          description: 'Asistencia Mecánica'
                        },
                        terms: [
                          {
                            code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                            description: 'Proveedor',
                            options: [
                              {
                                code: 'SOSBasic',
                                description: 'SOS Básica'
                              },
                              {
                                code: 'SOSPremium',
                                description: 'SOS Premium'
                              },
                              {
                                code: 'NoAssistance',
                                description: 'Sin Asistencia'
                              }
                            ],
                            value: 'SOSPremium'
                          }
                        ],
                        category: {
                          code: 'SURA_CA7_AsistenciasGrp'
                        }
                      }
                    ]
                  },
                  packages: [
                    {
                      code: 'A'
                    },
                    {
                      code: 'E'
                    },
                    {
                      code: 'B1'
                    },
                    {
                      code: 'B'
                    },
                    {
                      code: 'C1'
                    },
                    {
                      code: 'C'
                    },
                    {
                      code: 'CAtp'
                    },
                    {
                      code: 'CPrem'
                    },
                    {
                      code: 'CClima'
                    },
                    {
                      code:
                        'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3'
                    },
                    {
                      code:
                        'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1'
                    },
                    {
                      code:
                        'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2'
                    }
                  ],
                  coverages: [
                    {
                      pattern: {
                        code: 'SURA_CA7_ClausulaDeAjusteCov',
                        description: 'Cláusula de Ajuste'
                      },
                      terms: [
                        {
                          code: 'SURA_CA7_ClausulaDeAjusteLim',
                          description: 'Cláusula de Ajuste (%)',
                          value: 'SURA_CA7_ClausulaDeAjusteOpt2',
                          options: [
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                              description: '0'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                              description: '10'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                              description: '15'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                              description: '20'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                              description: '30'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                              description: '40'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                              description: '50'
                            }
                          ]
                        }
                      ],
                      category: {
                        code: 'SURA_CA7_CobAdicionalesGrp'
                      }
                    },
                    {
                      pattern: {
                        code: 'SURA_CA7_AsistenciaMecanicaCov',
                        description: 'Asistencia Mecánica'
                      },
                      terms: [
                        {
                          code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                          description: 'Proveedor',
                          options: [
                            {
                              code: 'SOSBasic',
                              description: 'SOS Básica'
                            },
                            {
                              code: 'SOSPremium',
                              description: 'SOS Premium'
                            },
                            {
                              code: 'NoAssistance',
                              description: 'Sin Asistencia'
                            }
                          ],
                          value: 'SOSPremium'
                        }
                      ],
                      category: {
                        code: 'SURA_CA7_AsistenciasGrp'
                      }
                    }
                  ]
                }
              ]
            }
          },
          {
            job: {
              number: '0001006215'
            },
            motor: {
              vehicles: [
                {
                  number: 2,
                  use: 3,
                  destination: 1,
                  activity: 'AC_99',
                  packages: [
                    {
                      code: 'A'
                    },
                    {
                      code: 'E'
                    },
                    {
                      code: 'B1'
                    },
                    {
                      code: 'B'
                    },
                    {
                      code: 'C1'
                    },
                    {
                      code: 'C'
                    },
                    {
                      code: 'CAtp'
                    },
                    {
                      code: 'CPrem'
                    },
                    {
                      code: 'CClima'
                    },
                    {
                      code:
                        'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2'
                    },
                    {
                      code:
                        'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3'
                    },
                    {
                      code:
                        'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4'
                    },
                    {
                      code:
                        'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5'
                    },
                    {
                      code:
                        'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3'
                    },
                    {
                      code:
                        'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1'
                    },
                    {
                      code:
                        'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2'
                    }
                  ],
                  coverages: [
                    {
                      pattern: {
                        code: 'SURA_CA7_AsistenciaMecanicaCov',
                        description: 'Asistencia Mecánica'
                      },
                      terms: [
                        {
                          code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                          options: [
                            {
                              code: 'SOSBasic',
                              description: 'SOS Básica'
                            },
                            {
                              code: 'SOSPremium',
                              description: 'SOS Premium'
                            },
                            {
                              code: 'NoAssistance',
                              description: 'Sin Asistencia'
                            }
                          ],
                          value: 'SOSPremium'
                        }
                      ]
                    },
                    {
                      pattern: {
                        code: 'SURA_CA7_ClausulaDeAjusteCov',
                        description: 'Cláusula de Ajuste'
                      },
                      terms: [
                        {
                          code: 'SURA_CA7_ClausulaDeAjusteLim',
                          options: [
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                              description: '0'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                              description: '10'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                              description: '15'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                              description: '20'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                              description: '30'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                              description: '40'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                              description: '50'
                            }
                          ],
                          value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            period: {
              start: '2026-08-30T00:01:00Z',
              end: '2026-11-30T00:01:00Z',
              method: 'Sura_ThreeMonths'
            }
          },
          {
            job: {
              number: '0001006215'
            },
            motor: {
              vehicles: [
                {
                  number: 3,
                  use: 3,
                  destination: 1,
                  activity: 'AC_99',
                  packages: [
                    {
                      code: 'A'
                    },
                    {
                      code: 'E'
                    },
                    {
                      code: 'B1'
                    },
                    {
                      code: 'B'
                    },
                    {
                      code: 'C1'
                    },
                    {
                      code: 'C'
                    },
                    {
                      code: 'CAtp'
                    },
                    {
                      code: 'CPrem'
                    },
                    {
                      code: 'CClima'
                    },
                    {
                      code:
                        'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2'
                    },
                    {
                      code:
                        'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3'
                    },
                    {
                      code:
                        'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4'
                    },
                    {
                      code:
                        'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5'
                    },
                    {
                      code:
                        'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3'
                    },
                    {
                      code:
                        'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1'
                    },
                    {
                      code:
                        'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2'
                    }
                  ],
                  coverages: [
                    {
                      pattern: {
                        code: 'SURA_CA7_AsistenciaMecanicaCov',
                        description: 'Asistencia Mecánica'
                      },
                      terms: [
                        {
                          code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                          options: [
                            {
                              code: 'SOSBasic',
                              description: 'SOS Básica'
                            },
                            {
                              code: 'SOSPremium',
                              description: 'SOS Premium'
                            },
                            {
                              code: 'NoAssistance',
                              description: 'Sin Asistencia'
                            }
                          ],
                          value: 'SOSBasic'
                        }
                      ]
                    },
                    {
                      pattern: {
                        code: 'SURA_CA7_ClausulaDeAjusteCov',
                        description: 'Cláusula de Ajuste'
                      },
                      terms: [
                        {
                          code: 'SURA_CA7_ClausulaDeAjusteLim',
                          options: [
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                              description: '0'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                              description: '10'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                              description: '15'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                              description: '20'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                              description: '30'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                              description: '40'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                              description: '50'
                            }
                          ],
                          value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            period: {
              start: '2026-08-30T00:01:00Z',
              end: '2026-11-30T00:01:00Z',
              method: 'Sura_ThreeMonths'
            }
          },
          {
            job: {
              number: '0001006215'
            },
            motor: {
              vehicles: [
                {
                  number: 4,
                  use: 3,
                  destination: 1,
                  activity: 'AC_99',
                  packages: [
                    {
                      code: 'A'
                    },
                    {
                      code: 'E'
                    },
                    {
                      code: 'B1'
                    },
                    {
                      code: 'B'
                    },
                    {
                      code: 'C1'
                    },
                    {
                      code: 'C'
                    },
                    {
                      code: 'CAtp'
                    },
                    {
                      code: 'CPrem'
                    },
                    {
                      code: 'CClima'
                    },
                    {
                      code:
                        'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2'
                    },
                    {
                      code:
                        'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3'
                    },
                    {
                      code:
                        'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4'
                    },
                    {
                      code:
                        'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5'
                    },
                    {
                      code:
                        'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3'
                    },
                    {
                      code:
                        'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1'
                    },
                    {
                      code:
                        'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2'
                    }
                  ],
                  coverages: [
                    {
                      pattern: {
                        code: 'SURA_CA7_AsistenciaMecanicaCov',
                        description: 'Asistencia Mecánica'
                      },
                      terms: [
                        {
                          code: 'SURA_CA7_AsistenciaMecanicaProveedorTerm',
                          options: [
                            {
                              code: 'SOSBasic',
                              description: 'SOS Básica'
                            },
                            {
                              code: 'SOSPremium',
                              description: 'SOS Premium'
                            },
                            {
                              code: 'NoAssistance',
                              description: 'Sin Asistencia'
                            }
                          ],
                          value: 'SOSPremium'
                        }
                      ]
                    },
                    {
                      pattern: {
                        code: 'SURA_CA7_ClausulaDeAjusteCov',
                        description: 'Cláusula de Ajuste'
                      },
                      terms: [
                        {
                          code: 'SURA_CA7_ClausulaDeAjusteLim',
                          options: [
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt1',
                              description: '0'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt2',
                              description: '10'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt3',
                              description: '15'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt4',
                              description: '20'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt5',
                              description: '30'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt6',
                              description: '40'
                            },
                            {
                              code: 'SURA_CA7_ClausulaDeAjusteOpt7',
                              description: '50'
                            }
                          ],
                          value: 'SURA_CA7_ClausulaDeAjusteOpt2'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            period: {
              start: '2026-08-30T00:01:00Z',
              end: '2026-11-30T00:01:00Z',
              method: 'Sura_ThreeMonths'
            }
          }
        ],
        costs: [
          {
            externalId: '1,C1&2,C&3,CPrem&4,C1',
            financial: 2796.67,
            internaltax: 30.76,
            administrativecharge: 3481.16,
            socialservice: 153.82,
            ssnrate: 492.21,
            vialrate: 307.63,
            submissionfee: 175,
            iva: {
              total: 6460.3,
              comun: 6460.3,
              gc: 0
            },
            basetaxes: 30763.32,
            sellado: {
              total: 0,
              base: 0
            },
            discount: 0,
            invoice: 12633.47,
            commission: 4177.4,
            total: 37900.41
          },
          {
            externalId: '1,C1&2,C&3,CPrem&4,C',
            financial: 2879.87,
            internaltax: 31.68,
            administrativecharge: 3589.69,
            socialservice: 158.39,
            ssnrate: 506.86,
            vialrate: 316.79,
            submissionfee: 175,
            iva: {
              total: 6652.5,
              comun: 6652.5,
              gc: 0
            },
            basetaxes: 31678.57,
            sellado: {
              total: 0,
              base: 0
            },
            discount: 0,
            invoice: 13009.333333333334,
            commission: 4307.63,
            total: 39028
          },
          {
            externalId: '1,C1&2,C&3,CPrem&4,CPrem',
            financial: 2936.5,
            internaltax: 32.3,
            administrativecharge: 3663.55,
            socialservice: 161.51,
            ssnrate: 516.82,
            vialrate: 323.01,
            submissionfee: 175,
            iva: {
              total: 6783.3,
              comun: 6783.3,
              gc: 0
            },
            basetaxes: 32301.45,
            sellado: {
              total: 0,
              base: 0
            },
            discount: 0,
            invoice: 13265.126666666667,
            commission: 4396.26,
            total: 39795.38
          },
          {
            externalId: '1,C1&2,C&3,CPrem&4,CClima',
            financial: 2967.29,
            internaltax: 32.64,
            administrativecharge: 3703.71,
            socialservice: 163.2,
            ssnrate: 522.24,
            vialrate: 326.4,
            submissionfee: 175,
            iva: {
              total: 6854.43,
              comun: 6854.43,
              gc: 0
            },
            basetaxes: 32640.14,
            sellado: {
              total: 0,
              base: 0
            },
            discount: 0,
            invoice: 13404.216666666667,
            commission: 4444.45,
            total: 40212.65
          }
        ],
        clauses: [
          {
            code: 'SURA_CA7_ClausulaDeAjusteOpt1',
            description: '0'
          },
          {
            code: 'SURA_CA7_ClausulaDeAjusteOpt2',
            description: '10'
          },
          {
            code: 'SURA_CA7_ClausulaDeAjusteOpt3',
            description: '15'
          },
          {
            code: 'SURA_CA7_ClausulaDeAjusteOpt4',
            description: '20'
          },
          {
            code: 'SURA_CA7_ClausulaDeAjusteOpt5',
            description: '30'
          },
          {
            code: 'SURA_CA7_ClausulaDeAjusteOpt6',
            description: '40'
          },
          {
            code: 'SURA_CA7_ClausulaDeAjusteOpt7',
            description: '50'
          }
        ],
        clauseSelected: 'SURA_CA7_ClausulaDeAjusteOpt2',
        errors: [],
        mechanicalAssists: [
          {
            number: 1,
            mechanicalAssists: [
              {
                code: 'SOSBasic',
                description: 'SOS Básica'
              },
              {
                code: 'SOSPremium',
                description: 'SOS Premium'
              },
              {
                code: 'NoAssistance',
                description: 'Sin Asistencia'
              }
            ]
          },
          {
            number: 2,
            mechanicalAssists: [
              {
                code: 'SOSBasic',
                description: 'SOS Básica'
              },
              {
                code: 'SOSPremium',
                description: 'SOS Premium'
              },
              {
                code: 'NoAssistance',
                description: 'Sin Asistencia'
              }
            ]
          },
          {
            number: 3,
            mechanicalAssists: [
              {
                code: 'SOSBasic',
                description: 'SOS Básica'
              },
              {
                code: 'SOSPremium',
                description: 'SOS Premium'
              },
              {
                code: 'NoAssistance',
                description: 'Sin Asistencia'
              }
            ]
          },
          {
            number: 4,
            mechanicalAssists: [
              {
                code: 'SOSBasic',
                description: 'SOS Básica'
              },
              {
                code: 'SOSPremium',
                description: 'SOS Premium'
              },
              {
                code: 'NoAssistance',
                description: 'Sin Asistencia'
              }
            ]
          }
        ],
        packageAdditionals: [
          {
            id: 1,
            license: null,
            chasis: null,
            motor: null,
            year: 2018,
            use: 3,
            activity: 'AC_99',
            destination: 1,
            gnc: false,
            gps: false,
            group: 'AUTO',
            packages: [
              {
                externalid: '1_A',
                code: 'A',
                description: 'RC',
                coverages: null,
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'RC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '1_B1',
                code: 'B1',
                description: 'B1',
                selected: false,
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '1_B',
                code: 'B',
                description: 'B',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                selected: false,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '1_C1',
                code: 'C1',
                description: 'C1',
                selected: true,
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '1_C',
                code: 'C',
                selected: false,
                description: 'C',
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '1_CPrem',
                code: 'CPrem',
                selected: false,
                description: 'C Premium',
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '1_CClima',
                code: 'CClima',
                description: 'C Clima',
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                selected: false,
                costs: null,
                group: 'TC'
              },
              {
                externalid:
                  '1_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                description: 'Fcia. Fija $10.000',
                coverages: null,
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '1_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                description: 'Fcia. Fija $15.000',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '1_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                description: 'Fcia. Fija $20.000',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '1_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                description: 'Fcia. Fija $30.000',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '1_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                description: 'Fcia. Variable 2%',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '1_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                description: 'Fcia. Variable 3%',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '1_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                description: 'Fcia. Variable 6%',
                coverages: null,
                selected: false,
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1716.8,
                  body: 8427.05,
                  assistance: 322.63,
                  total: 9660.38
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              }
            ],
            brand: {
              code: 18,
              description: 'FORD'
            },
            statedamount: 1075000,
            model: {
              code: 698,
              year: null,
              description: 'FORD ECO SPORT 1.5 FREESTYLE L/18',
              statementamount: 1075000,
              originalcostnew: 1075000,
              type: 'Auto'
            },
            zone: {
              city: 'CIUDAD AUTONOMA BUENOS AIRES',
              postalcode: '1001',
              state: 'AR_23'
            },
            garage: null,
            kmstraveled: null,
            useName: 'PARTICULAR',
            number: 1,
            driver: {
              firstname: null,
              lastname: null,
              birth: null,
              gender: null,
              clientIsDriver: true
            },
            bondholder: {
              finish: null,
              firstinstallmentdue: null,
              number: null,
              quotas: null,
              start: null,
              type: null
            },
            zerokm: false,
            shortModel: 'ECO SPORT',
            blacklist: false,
            patentInUse: false,
            added: true
          },
          {
            id: 2,
            license: null,
            chasis: null,
            motor: null,
            year: 2017,
            use: 3,
            activity: 'AC_99',
            destination: 1,
            gnc: false,
            gps: false,
            group: 'AUTO',
            packages: [
              {
                externalid: '2_A',
                code: 'A',
                description: 'RC',
                coverages: null,
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'RC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '2_B1',
                code: 'B1',
                description: 'B1',
                selected: false,
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '2_B',
                code: 'B',
                description: 'B',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                selected: false,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '2_C1',
                code: 'C1',
                description: 'C1',
                selected: false,
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '2_C',
                code: 'C',
                selected: true,
                description: 'C',
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '2_CPrem',
                code: 'CPrem',
                selected: false,
                description: 'C Premium',
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '2_CClima',
                code: 'CClima',
                description: 'C Clima',
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                selected: false,
                costs: null,
                group: 'TC'
              },
              {
                externalid:
                  '2_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                description: 'Fcia. Fija $10.000',
                coverages: null,
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '2_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                description: 'Fcia. Fija $15.000',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '2_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                description: 'Fcia. Fija $20.000',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '2_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                description: 'Fcia. Fija $30.000',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '2_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                description: 'Fcia. Variable 2%',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '2_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                description: 'Fcia. Variable 3%',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '2_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                description: 'Fcia. Variable 6%',
                coverages: null,
                selected: false,
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 3772.22,
                  assistance: 322.63,
                  total: 4990.48
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              }
            ],
            brand: {
              code: 18,
              description: 'FORD'
            },
            statedamount: 443000,
            model: {
              code: 527,
              year: null,
              description: 'FORD FIESTA 1.6 4 PTAS ONE MAX EDGE PLU',
              statementamount: 443000,
              originalcostnew: 443000,
              type: 'Auto'
            },
            zone: {
              city: 'CIUDAD AUTONOMA BUENOS AIRES',
              postalcode: '1001',
              state: 'AR_23'
            },
            garage: null,
            kmstraveled: null,
            useName: 'PARTICULAR',
            number: 2,
            driver: {
              firstname: null,
              lastname: null,
              birth: null,
              gender: null,
              clientIsDriver: true
            },
            bondholder: {
              finish: null,
              firstinstallmentdue: null,
              number: null,
              quotas: null,
              start: null,
              type: null
            },
            zerokm: false,
            shortModel: 'FIESTA',
            blacklist: false,
            patentInUse: false,
            added: true
          },
          {
            id: 3,
            license: null,
            chasis: null,
            motor: null,
            year: 2016,
            use: 3,
            activity: 'AC_99',
            destination: 1,
            gnc: false,
            gps: false,
            group: 'AUTO',
            packages: [
              {
                externalid: '3_A',
                code: 'A',
                description: 'RC',
                coverages: null,
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'RC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '3_B1',
                code: 'B1',
                description: 'B1',
                selected: false,
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '3_B',
                code: 'B',
                description: 'B',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                selected: false,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '3_C1',
                code: 'C1',
                description: 'C1',
                selected: false,
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '3_C',
                code: 'C',
                selected: false,
                description: 'C',
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '3_CPrem',
                code: 'CPrem',
                selected: true,
                description: 'C Premium',
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '3_CClima',
                code: 'CClima',
                description: 'C Clima',
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                selected: false,
                costs: null,
                group: 'TC'
              },
              {
                externalid:
                  '3_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                description: 'Fcia. Fija $10.000',
                coverages: null,
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '3_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                description: 'Fcia. Fija $15.000',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '3_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                description: 'Fcia. Fija $20.000',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '3_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                description: 'Fcia. Fija $30.000',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '3_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                description: 'Fcia. Variable 2%',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '3_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                description: 'Fcia. Variable 3%',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '3_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                description: 'Fcia. Variable 6%',
                coverages: null,
                selected: false,
                coveragesQuoted: null,
                limitrc: null,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              }
            ],
            brand: {
              code: 12,
              description: 'CHEVROLET'
            },
            statedamount: 426000,
            model: {
              code: 424,
              year: null,
              description: 'CHEVROLET AGILE 1.4 5 PTAS LS SPIRIT',
              statementamount: 426000,
              originalcostnew: 426000,
              type: 'Auto'
            },
            zone: {
              city: 'CIUDAD AUTONOMA BUENOS AIRES',
              postalcode: '1001',
              state: 'AR_23'
            },
            garage: null,
            kmstraveled: null,
            useName: 'PARTICULAR',
            number: 3,
            driver: {
              firstname: null,
              lastname: null,
              birth: null,
              gender: null,
              clientIsDriver: true
            },
            bondholder: {
              finish: null,
              firstinstallmentdue: null,
              number: null,
              quotas: null,
              start: null,
              type: null
            },
            zerokm: false,
            shortModel: 'AGILE',
            blacklist: false,
            patentInUse: false,
            added: true
          },
          {
            id: 4,
            license: null,
            chasis: null,
            motor: null,
            year: 2017,
            use: 3,
            activity: 'AC_99',
            destination: 1,
            gnc: false,
            gps: false,
            group: 'AUTO',
            packages: [
              {
                externalid: '4_A',
                code: 'A',
                description: 'RC',
                coverages: null,
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: null,
                costs: null,
                group: 'RC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '4_B1',
                code: 'B1',
                description: 'B1',
                selected: false,
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                premiums: null,
                costs: null,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '4_B',
                code: 'B',
                description: 'B',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                premiums: null,
                costs: null,
                selected: false,
                group: 'BASIC',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid: '4_C1',
                code: 'C1',
                description: 'C1',
                selected: false,
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 2934.68,
                  assistance: 134.85,
                  total: 4183.93
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '4_C',
                code: 'C',
                selected: false,
                description: 'C',
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 3627.46,
                  assistance: 134.85,
                  total: 4851.07
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '4_CPrem',
                code: 'CPrem',
                selected: false,
                description: 'C Premium',
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4098.94,
                  assistance: 134.85,
                  total: 5305.11
                },
                costs: null,
                group: 'TC'
              },
              {
                externalid: '4_CClima',
                code: 'CClima',
                description: 'C Clima',
                coverages: null,
                coveragesQuoted: null,
                limitrc: 10000000,
                premiums: {
                  rc: 1508.7,
                  body: 4355.31,
                  assistance: 134.85,
                  total: 5551.99
                },
                selected: false,
                costs: null,
                group: 'TC'
              },
              {
                externalid:
                  '4_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt2',
                description: 'Fcia. Fija $10.000',
                coverages: null,
                coveragesQuoted: null,
                selected: false,
                limitrc: null,
                premiums: null,
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '4_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt3',
                description: 'Fcia. Fija $15.000',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: null,
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '4_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt4',
                description: 'Fcia. Fija $20.000',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: null,
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '4_TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                code:
                  'TR||SURA_CA7_DanoParcialFFCov||SURA_CA7_DanoParcialFFDed||SURA_CA7_DanoParcialFFOpt5',
                description: 'Fcia. Fija $30.000',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: null,
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '4_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt3',
                description: 'Fcia. Variable 2%',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: null,
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '4_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt1',
                description: 'Fcia. Variable 3%',
                coverages: null,
                coveragesQuoted: null,
                limitrc: null,
                selected: false,
                premiums: null,
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              },
              {
                externalid:
                  '4_TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                code:
                  'TRFV||SURA_CA7_DanoParcialFVCov||SURA_CA7_DanoTotalFVDed||SURA_CA7_DanoParcialFVOpt2',
                description: 'Fcia. Variable 6%',
                coverages: null,
                selected: false,
                coveragesQuoted: null,
                limitrc: null,
                premiums: null,
                costs: null,
                group: 'TR',
                error: {
                  code: null,
                  message: null,
                  externalid: null
                }
              }
            ],
            brand: {
              code: 12,
              description: 'CHEVROLET'
            },
            statedamount: 462000,
            model: {
              code: 410,
              year: null,
              description: 'CHEVROLET AVEO 1.6 LS G3',
              statementamount: 462000,
              originalcostnew: 462000,
              type: 'Auto'
            },
            zone: {
              city: 'CIUDAD AUTONOMA BUENOS AIRES',
              postalcode: '1001',
              state: 'AR_23'
            },
            garage: null,
            kmstraveled: null,
            useName: 'PARTICULAR',
            number: 4,
            driver: {
              firstname: null,
              lastname: null,
              birth: null,
              gender: null,
              clientIsDriver: true
            },
            bondholder: {
              finish: null,
              firstinstallmentdue: null,
              number: null,
              quotas: null,
              start: null,
              type: null
            },
            zerokm: false,
            shortModel: 'AVEO',
            blacklist: false,
            patentInUse: false,
            added: true
          }
        ],
        uber: false,
        defaultUseDestinationActivity: null,
        groupCoverage: 'TC',
        coverageFail: false,
        quoteSaved: false,
        packageSelected: [
          {
            code: 'C1',
            number: 1
          },
          {
            code: 'C',
            number: 2
          },
          {
            code: 'CPrem',
            number: 3
          },
          {
            code: 'CClima',
            number: 4
          }
        ]
      },
      mobilityVisited: false,
      formMobility: {
        valid: false
      },
      serverDate: '2026-08-30T09:14:59.000Z'
    },
    producer: {
      code: 234,
      description: '',
      profile: {
        lines: {
          motor: true,
          home: true,
          personalaccident: true
        },
        catalogs: {
          motor: 1
        },
        description: 'Marin Gaston Adrian',
        planid: '2076',
        channel: 'AMBA'
      },
      commission: {
        lines: {
          default: {
            administratorcharge: 0,
            commissions: {
              producer: {
                default: 0,
                maximum: 0
              },
              organizer: {
                default: 0,
                maximum: 0
              },
              superorganizer: {
                default: 0,
                maximum: 0
              }
            }
          },
          motor: {
            administratorcharge: 0,
            commissions: {
              producer: {
                default: 0,
                maximum: 0
              },
              organizer: {
                default: 0,
                maximum: 0
              },
              superorganizer: {
                default: 0,
                maximum: 0
              }
            }
          },
          home: {
            administratorcharge: 0,
            commissions: {
              producer: {
                default: 0,
                maximum: 0
              },
              organizer: {
                default: 0,
                maximum: 0
              },
              superorganizer: {
                default: 0,
                maximum: 0
              }
            }
          },
          personalaccident: {
            administratorcharge: 0,
            commissions: {
              producer: 0,
              organizer: 0,
              superorganizer: 0
            }
          }
        }
      }
    },
    emission: {
      routes: [],
      activeRoute: '',
      client: {
        accountnumber: null,
        addresses: null,
        cellphone: {
          area: null,
          number: null
        },
        homephone: null,
        primaryaddress: null,
        birth: null,
        documentNumber: null,
        documentType: null,
        firstname: null,
        gender: null,
        fiscalcondition: null,
        iibb: {
          type: null,
          number: null
        },
        politicallyexposed: null,
        lastname: null,
        maritalstatus: null,
        consortium: null,
        officialorganism: null,
        companyname: null,
        contactid: null,
        officialids: null,
        type: null,
        address: {
          apartment: null,
          city: null,
          floor: null,
          id: null,
          postalcode: null,
          state: null,
          street: null,
          streetnumber: null,
          type: null,
          clarification: null
        },
        email: null,
        nationality: null,
        certificate: {
          start: null,
          end: null
        },
        blacklist: false,
        editable: false
      },
      enableIssue: false,
      uwIssue: false,
      emissionVisited: false,
      formEmission: {
        clientIsValid: false,
        residenceIsValid: false,
        taxIsValid: false,
        validityIsValid: false,
        othersIsValid: false
      },
      jobNumberFromQuotes: null,
      policyAddressFromQuotes: {
        id: null,
        state: null,
        city: null
      },
      approvedEmission: false
    }
  };
}
