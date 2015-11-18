//
//  CDVCopy.h
//  JajaReg
//
//  Created by gaozhifei on 15/6/18.
//
//

#import <UIKit/UIKit.h>

#import <Cordova/CDVPlugin.h>

@interface CDVCopy : CDVPlugin

// 字符串复制
- (void)stringWithCopy:(CDVInvokedUrlCommand *) command;

@end
