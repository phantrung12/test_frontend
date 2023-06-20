import { Button, Col, Input, Row, Space, DatePicker, Typography } from 'antd';
import React, { useState } from 'react';
import FormItem from '../../components/FormItem';
import { Controller, useForm } from 'react-hook-form';
import './setting.less';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ISettingForm } from '../../../types/Setting.type';
import dayjs from 'dayjs';
import { emailRegex } from '../../../utils/regex';

const { RangePicker } = DatePicker;

const schema = yup.object().shape({
  title: yup.string().nullable().required('Title is required'),
  email: yup
    .string()
    .nullable()
    .required('Email is required')
    .matches(emailRegex, 'Email is invalid'),
  backgroundColor: yup
    .string()
    .nullable()
    .required('Background color is required'),
  activeDate: yup
    .array()
    .min(1, 'Active date is required')
    .nullable()
    .required('Active date is required'),
});

const Setting = () => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    // defaultValues: { backgroundColor: '#000' },
  });

  const [selectedColor, setSelectedColor] = useState<string>();

  const onSubmit = (data: ISettingForm) => {
    data = {
      ...data,
      activeDate: data.activeDate?.map(item =>
        dayjs(item).format('DD-MM-YYYY'),
      ),
    };
    console.log(data);
  };

  return (
    <div className="setting">
      <Typography.Title level={4}>Setting</Typography.Title>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <FormItem title={'Title:'} errorText={fieldState.error?.message}>
                <Input {...field} />
              </FormItem>
            )}
          />
        </Col>
        <Col span={12}>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <FormItem title={'Email:'} errorText={fieldState.error?.message}>
                <Input {...field} type="email" />
              </FormItem>
            )}
          />
        </Col>
        <Col span={12}>
          <Controller
            name="backgroundColor"
            control={control}
            render={({ field, fieldState }) => (
              <FormItem
                title={'Background color:'}
                errorText={fieldState.error?.message}
              >
                <div className="select-color-input">
                  <div className="text-input">
                    <Input style={{ color: selectedColor }} />
                  </div>
                  <div className="color-input">
                    <Input
                      {...field}
                      type="color"
                      onChange={event => {
                        field.onChange(event.target.value);
                        setSelectedColor(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </FormItem>
            )}
          />
        </Col>
        <Col span={12}>
          <Controller
            name="activeDate"
            control={control}
            render={({ field, fieldState }) => (
              <FormItem
                title={'Active date: '}
                errorText={fieldState.error?.message}
              >
                <RangePicker {...field} className="w-100" />
              </FormItem>
            )}
          />
        </Col>
        <Col span={24}>
          <Space onClick={handleSubmit(onSubmit)} className="w-100 justify-end">
            {isDirty && (
              <Button type="primary" size="large">
                Submit
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Setting;
